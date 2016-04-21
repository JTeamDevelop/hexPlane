hexPlaneMap.prototype.foeCheck = function () {

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

  //Increase the time by the next time
  this.addTime(nT);
  //set the Q to the determined next queue item
  var Q = this._queue[next];
  //Run the queue function with the given options
  this[Q.f](Q.opts);
  //after the function delete the queue item so it isn't run again
  delete this._queue[next];
}
hexPlaneMap.prototype.addTime = function (dT) {
  this._time+=dT;
  var thtml = "Day "+(this._time%30+1)+" Month "+Math.floor(this._time/30)+" Year "+Math.floor(this._time/360);
  d3.select("#time").html(thtml);
}
hexPlaneMap.prototype.cellEnter = function (cid) {
  var map=this, cell = this.cells[cid];
  if(objExists(cell.pop)){
    if(cell.pop.troubles<1){
      return;
    }
    var T = TROUBLE.random();
    var html="<div class='center header'>"+cell.pop.eid+" "+POPSIZE[cell.pop.size]+"</div>"+T.name;
    html+="<div class='buttons center'><button class=actionHelp>Help the "+cell.pop.eid+" people.</buttion>";
    html+="<button class=actionRest>Rest for a time.</buttion></div>"

    $("#notify .content").empty();
    $("#notify").removeClass("wide");
    $("#notify").addClass("slim");
    $("#notify .content").append(html);
    $("#notify").slideDown();

    d3.select(".actionHelp").on("click", function(){
      $("#notify").slideUp();
      if(map.heroOvercome(cid,T)) {
        var n = noty({layout: 'center', type: 'success', timeout: 1500, text: "Success!"});
        cell.pop.troubles--;
      }
      else {
        var html = "You tried, but were unable to overcome the problem. At least you learned from the experience.";
        var n = noty({layout: 'center', type: 'warning', timeout: 1500, text: html });
      }
    });

    d3.select(".actionRest").on("click", function(){
      $("#notify").slideUp();
    });
  }
}
hexPlaneMap.prototype.act = function () {
  var summary = [];
  for (var x in this.cells){
    if(objExists(this.cells[x].pop)){
      summary = summary.concat(this.popAct(this.cells[x]));
    }
  }

  this._time[1]++;
  if(this._time[1] > 0 && this._time[1]%12 == 0){
    this._time[2]++;
    this._time[1]=0;
  }

  summary.unshift(this._time[2],this._time[1]);
  console.log(summary);
}
hexPlaneMap.prototype.popAct = function (cell) {
  var map = this,
    empire = this.empires[cell.empire],
    aggro = this.empireAggro(cell.empire),
    doom = this.empireDoom(cell.empire),
    nC = this.neighboors(cell.x+","+cell.y),
    site = "",
    strength = [6,8,10,12,20],
    cost = [1,2,4,8,16]
    summary = [];

  for (var i = 0; i < nC.length; i++) {
    if(objExists(nC[i].ncell.ruin) && !objExists(nC[i].ncell.empire)) {
      site = nC[i].id;
    }
    if(objExists(nC[i].ncell.site) && !objExists(nC[i].ncell.empire)) {
      site = nC[i].id;
    }
  }

  function increaseTrouble() {
    var tid = xorRNG.rndInt(0,cell.pop.troubles.length-1);
    cell.pop.troubles[tid][1]++;
    summary.push(empire.name+" Increase Trouble");
  }

  function rndTrouble() {
    var tid=-1;
    if(xorRNG.random()<0.5){
      tid = xorRNG.rndInt(0,TROUBLE.length-1);
      //push the trouble with strength
      cell.pop.troubles.push([tid,1]);
      summary.push(empire.name+" Add Trouble");
    } else {
      increaseTrouble();
    }
  }

  function nTrouble (){
    var n =0;
    cell.pop.troubles.forEach(function (T) {
      n+=T[1];
    })
    return n;
  }

  function troubleCheck (){
    var nT = nTrouble(), str=strength[cell.pop.size-1], R = xorRNG.rndInt(1,str);
    if(R > nT){
      return true;
    }
    else {
      return false;
    }
  }

  function Amass() {
    if(troubleCheck()){
      empire.power+=cell.pop.size/2;
      summary.push(empire.name+" Amass");
    }
  }

  function Build(asset){
    //subrtact the power cost
    empire.power-=cost[cell.pop.size-1];

    if(troubleCheck()){
      //success - add asset
      cell.pop.assets.push(asset);
      summary.push(empire.name+" Build "+asset);
      //add or increase troble
      rndTrouble();
    } else {
      increaseTrouble();
    }
  }

  function Grow(ncid){
    empire.power--;
    empire.cells.push(ncid);
    map.cells[cell].empire = cell.empire;
    map.cells[cell].pop = {size:1,assets:[],trouble:[]};

    if(ncid == site){

    }
    else {

    }
    summary.push(empire.name+" Grow "+ncid);
  }

  function Attack(){
    summary.push(empire.name+" Attack");
  }

  //Amass, Build, Grow, Attack
  if(doom){
    if(!cell.pop.assets.contains("Army")){
      //build army if it has the power
      if(empire.power>cost[cell.pop.size-1]){
        Build("Army");
      } else {
        //Amass power
        Amass();
      }
    }
    else {
      var action = [Amass,Build,Grow,Attack];
      for (var i = 0; i < aggro; i++) {
        action.push(Attack);
      }

      action.random()();
    }
  }
  else {
    if(aggro>-1) {
      var action = [Amass,Build,Grow,Attack];
      action.random()();
    }
    else {
      var action = [Amass,Amass,Amass,Build,Build,Grow];
      action.random()();
    }
  }

  return summary;
}
