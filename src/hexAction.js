CPX.actionMonthlyFate = function (rid) {
	//load the map, create the RNG based upon the map uid and the time, basic doom %
	var map = cpxActive.realms[rid],
		cRNG = new RNG(map.uid+"_MF"+map._time),
		doom = [.75,.5,.25], cell = {}, cN={}, ndoom=false;

	//this is what can happen if bad things happen
	function doomIncrease(cell) {
		//trouble doesn't increase - doom does
		if(cell.doom<3){
			//if doom is less than 3 always increase it
			cell.doom++;
		}
		else if (cell.doom<5) {
			//if doom is less than 5 - it is fifty fifty for an increase
			if(cRNG.TrueFalse()){
				cell.doom++;
			}
			else {
				//if it doesn't increase - increase the doom of a neighboor cell
				cN.random(cRNG).ncell.doom++;
			}
		}
		else {
			//if doom is 5 - it always expands to another cell
			cN.random(cRNG).ncell.doom++;
		}
	}

	function fateCheck(cell,dp) {
		if(cRNG.random()<doom){
			//bad things happen
			//check for pop
			if (objExists(cell.pop)){
				//Fifty percent chance to increase the trouble
				if(cRNG.TrueFalse()){
					cell.pop.troubles++;
					//if the trouble is greater than twice the size + 6 the pop collapses into chaos, disbands, and doom increases
					if(cell.pop.troubles>=Math.floor(cell.pop.size)*2+6) {
						delete cell.pop;
						cell.doom++;
					}
				}
				else {
					//if no trouble, then doom
					doomIncrease(cell);
				}
			}
			else {
				//if no pop it is always a doom increase
				doomIncrease(cell);
			}
		}
		else {
			//good things
			if(cell.pop.troubles < 2){
				//if there is only 1 trouble we may increase size
				if(cell.pop.size <3){
					//if size is less than three increase it, but get troubles
					cell.pop.size++;
					cell.pop.troubles+=cRNG.rndInt(1,2);
				}
				else if (cell.pop.size<5) {
					//if size is less than five fifty/fifty increase, but get troubles
					if(cRNG.TrueFalse()){
						cell.pop.size++;
						cell.pop.troubles+=cRNG.rndInt(2,3);
					}
					else {
						//expand the empire instead
						map.empireExpand(cell.pop.eid,cRNG);
					}
				}
				else {
					//The cell has pop of 5 expand the empire instead
					map.empireExpand(cell.pop.eid,cRNG);
				}
			}
			else {
				//reduce trouble
				cell.pop.troubles--;
			}
		}
	}

	//loop through the cells
	for(var x in map.cells){
		cell = map.cells[x];
		//neighbooring doom
		ndoom = false;
		//if the cell has a pop, make a fate check
		if(objExists(cell.pop) || objExists(cell.site) || objExists(cell.ruin) || cell.doom>0){
			//only a ten percent chance things happen in a month
			if(cRNG<.1){
				//get the cell neighboors
				cN=map.neighboors(x).n;
				//;oop through
				for (var i = 0; i < cN.length; i++) {
					//if a neighboor has doom - set to true
					if(cN[i].ncell.doom>0) {
						ndoom = true;
					}
				}

				//if there is doom already in the cell use the first percent
				if(cell.doom>0){
					fateCheck(cell,doom[0]);
				}
				else if (ndoom) {
					fateCheck(cell,doom[1]);
				}
				else {
					fateCheck(cell,doom[2]);
				}

			}
		}
	}
}

hexPlaneMap.prototype.queueStart = function () {

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
hexPlaneMap.prototype.actionNewMonth = function () {
	var hlist = CPX.activeHeroByRealm(this.uid), hero = {};
	this.addTime(30);
	for (var i = 0; i < hlist.length; i++) {
		hero = cpxActive.heroes[hlist[i]];
		if(hero.AP < 0) {
			hero.AP+=30;
		}
		else {
			hero.AP = 30;
		}
	}
	d3.select("#currentAP").html("AP "+cpxCurrentHero.AP);
}
hexPlaneMap.prototype.addTime = function (dT) {
  this._time+=dT;
	var month = Math.floor(this._time/30)%12+1;
  var thtml = "Month "+month+" Year "+Math.floor(this._time/360);
  d3.select("#time").html(thtml);
}
hexPlaneMap.prototype.actionCellEnter = function (cid) {
  var map=this, cell = this.cells[cid];

	function encounter() {
		var foes = CPX.foe(map,cid,cpxCurrentHero.uid),
			R = xorRNG.DWRoll(),
			scouting =CPX.heroSkillValue(cpxCurrentHero,"Scouting");

		map._currentEncounter=foes;
		map.displayEncounter();
	}

	if(cell.doom>0){
		//if there is doom there will be an attack
		encounter();
	}
	else {
		if(objExists(cell.pop)){
			//if there is pop - there may be an attack based upon trouble
			var p=0.1*cell.pop.troubles;
			if(xorRNG.random()<p){
				encounter();
			}
		}
		else {
			//if no pop straigh 10% chance of trouble
			if(xorRNG.random()<0.1){
				encounter();
			}
		}
	}

  if(objExists(cell.pop)){
    html = "<button class=actionRest>Rest & Recover</buttion>";
    html+="<button class=actionExplore>Explore the Region</buttion>";

    d3.select("#heroOptions").html(html);

    d3.select(".actionExplore").on("click", function(){
      var AP = xorRNG.rndInt(2,5);
			//check for AP
			if(CPX.heroAPCheck(AP,"explore")){
				//explore
				map.heroActionExplore(cid);
			}
    });

    d3.select(".actionRest").on("click", function(){
			//check for AP
			if(CPX.heroAPCheck(7,"rest")){
				//recover
				map.heroActionRest();
			}
    });
  }
	else {
		html = "<button class=actionCamp>Make Camp</buttion>";
    html+="<button class=actionExplore>Explore the Region</buttion>";

		d3.select(".actionCamp").on("click", function(){
			//check for AP
			if(CPX.heroAPCheck(1,"camp")){
				//rest
			}
    });

    d3.select("#heroOptions").html(html);
	}
}
