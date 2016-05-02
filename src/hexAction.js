hexPlaneMap.prototype.queueStart = function () {
  //first due the initial monthly foe check
	this.monthlyFoeCheck();
}
hexPlaneMap.prototype.monthlyFoeCheck = function () {
  //for each cell
  for (var x in this.cells) {
    //if it has a population with troubles
    if(objExists(this.cells[x].pop)){
      //if there is a foe - remove it
      this.cells[x].tags.remove("foe");
      //if there are troubles - loop through troubles
      if(this.cells[x].pop.troubles>0) {
        for (var i = 0; i < this.cells[x].pop.troubles; i++) {
          //10% chance of foe for each trouble
          if(xorRNG.random()<0.10) {
            this.cells[x].tags.push("foe");
            //continue the loop with the next cell
            continue;
          }
        }
      }
    }
  }
  this.queueNew(this._time+30,"monthlyFoeCheck",{});
  this.queueCheck();
}
hexPlaneMap.prototype.queueNew = function (t,f,opts) {
  //new Q object
  var Q = {
    uid: makeUID(9),
    t:t,
    f:f,
    opts:opts
  };
  //add Q to the queue
  this._queue[Q.uid]=Q;
}
hexPlaneMap.prototype.queueCheck = function () {
  var next ="", nT=9999, dT=0;
  //loop through the queue
  for (var x in this._queue){
    //determine the dT - time between current time and time of the Q action
    dT = this._queue[x].t - this._time;
    //if the dT is less than the nT - next time
    //This will ensure the queue with the lowest next time is taken
    if(dT<nT) {
      //make the next time the dT & set the next queue to the queue id
      nT=dT;
      next = x;
    }
  }

  if(next == ""){
    return;
  }

  //Increase the time by the next time
  this.addTime(nT);
  //set the Q to the determined next queue item
  var Q = JSON.stringify(this._queue[next]);
  Q= JSON.parse(Q);
  //we have the data delete the object from the queue
  delete this._queue[next];
  //If it is a hero action, make the hero the current hero
  if(Q.f.substring(0,4) == "hero"){
    this.heroMakeCurrent(Q.opts.hid);
  }
  //Run the queue function with the given options
  this[Q.f](Q.opts);
}
hexPlaneMap.prototype.addTime = function (dT) {
  this._time+=dT;
  var thtml = "Day "+(this._time%30+1)+" Month "+Math.floor(this._time/30)+" Year "+Math.floor(this._time/360);
  d3.select("#time").html(thtml);
}
hexPlaneMap.prototype.cellEnter = function (cid) {
  var map=this, cell = this.cells[cid];
  if(objExists(cell.pop)){
    if(cell.tags.contains("foe")){
			var foes = CPX.foe(map,cid,this._currentHero.uid);
      this._currentEncounter=foes;
			this.displayEncounter();
    }

    html = "<button class=actionRest>Rest & Recover</buttion>";
    html+="<button class=actionExplore>Explore the Region</buttion>";

    d3.select("#heroOptions").html(html);

    d3.select(".actionExplore").on("click", function(){
      var dT = xorRNG.rndInt(2,5);
      map.queueNew(map._time+dT,"heroActionExplore",{hid:map._currentHero.uid,cid:cid});
      map.heroEndTurn();
    });

    d3.select(".actionRest").on("click", function(){
      map.queueNew(map._time+7,"heroActionRest",{hid:map._currentHero.uid});
      map.heroEndTurn();
    });
  }
}
