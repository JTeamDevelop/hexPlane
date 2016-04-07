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
  var map = this, tRNG = this.fullRNG,
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
    var tid = tRNG.rndInt(0,cell.pop.troubles.length-1);
    cell.pop.troubles[tid][1]++;
    summary.push(empire.name+" Increase Trouble");
  }

  function rndTrouble() {
    var tid=-1;
    if(tRNG.random()<0.5){
      tid = tRNG.rndInt(0,TROUBLE.length-1);
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
    var nT = nTrouble(), str=strength[cell.pop.size-1], R = tRNG.rndInt(1,str);
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
