hexPlaneMap.prototype.empireOpenN = function (empire) {
  var nids = [], nC=[];
  for (var i = 0; i < empire.cells.length; i++) {
    nC = this.neighboors(empire.cells[i]).n;
    for (var j = 0; j < nC.length; j++) {
      if(!objExists(nC[j].ncell.pop)) {
        nids.push(nC[j].id);
      }
    }
  }
  nids.unique();
  return nids;
}
hexPlaneMap.prototype.empireBounds = function (empire) {
  var min=[99,99],max=[-99,-99], x=-99, y=-99;
  for (var i = 0; i < empire.cells.length; i++) {
    x = this.cells[empire.cells[i]].x;
    y = this.cells[empire.cells[i]].y;
    if(x>max[0]){
      max[0]=x;
    }
    if(x<min[0]){
      min[0]=x;
    }
    if(y>max[1]){
      max[1]=y
    }
    if(y<min[1]){
      min[1]=y
    }
  }
  return {min:min,max:max};
}
hexPlaneMap.prototype.empireExpand = function (eid) {
  var map = this, empire = this._empires[eid];

  //absorb the neighboors
  function absorb () {
    var cell = {}, nids = map.empireOpenN(empire);
    for (var i = 0; i < nids.length; i++) {
      cell = map.cells[nids[i]];
      if (objExists(cell.site)) {
        cell.pop = {size:1,eid:eid};
        empire.cells.push(nids[i]);
        empire.power+=cell.site.size-1;

        return true;
      }
      else if (objExists(cell.ruin)) {
        empire.cells.push(nids[i]);
        cell.pop = {size:1,eid:eid};

        return true;
      }
    }
    return false;
  }

  var cell = {}, cid="";
  while (empire.power > 0.5) {
    if(!absorb()){
      //absorb new cell
      if(map.RNG.random()<0.75) {
        cid = map.empireOpenN(empire).random(map.RNG);
        cell = map.cells[cid];
        cell.pop = {size:1,eid:eid};
        empire.cells.push(cid);
        empire.power--;
      }
      //add power to current cell pop
      else {
        cell = map.cells[empire.cells.random(map.RNG)];
        if(cell.pop.size <2){
          cell.pop.size++;
          empire.power--;
        }
        else if (cell.pop.size==3) {
          if(map.RNG.random()<0.25){
            cell.pop.size++;
            empire.power--;
          }
        }
        else if (cell.pop==4) {
          if(map.RNG.random()<0.05){
            cell.pop.size++;
            empire.power--;
          }
        }
      }
    }
  }

}
////////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.empireDoom = function (eid) {
  var empire = this._population[eid].empire, doom=false;
  for (var i = 0; i < empire.pop.length; i++) {
    if(this.cells[empire.cells[i]].tags.contains("Doom")){
      doom = true;
    }
  }
  return doom;
}
hexPlaneMap.prototype.empireNeighboors = function (eid) {
  var empire = this._population[eid].empire, nC=[], N=[];
  for (var i = 0; i < empire.cells.length; i++) {
    nC = this.neighboors(empire.cells[i]);
    for (var j = 0; j < nC.length; j++) {
      if (objExists(nC[j].ncell.empire)) {
        if(nC[j].ncell.empire != eid) {
          N.push(nC[j].ncell.empire);
        }
      }
      else {
        if(objExists(map._population[nC[j].id])) {
          N.push(nC[j].id);
        }
      }
    }
  }
  N.unique();
  return N;
}
hexPlaneMap.prototype.empireAggro = function (eid) {
  var empire = this._empires[eid], aggro=-8, pop={};
  for (var i = 0; i < empire.pop.length; i++) {
    pop = this._population[empire.pop[i]];
    if(pop.aggro>aggro) {
      aggro = pop.aggro;
    }
  }

  return aggro;
}
hexPlaneMap.prototype.empirePop = function (eid) {
  var empire = this._population[eid].empire, pop={};
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      pop[empire.cells[i]] = this._population[empire.cells[i]];
    }
  }
  return pop;
}
hexPlaneMap.prototype.empirePopColors = function (eid) {
  var empire = this._population[eid].empire, colors=[];
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      colors = colors.concat(this._population[empire.cells[i]].colors);
    }
  }
  return colors;
}
////////////////////////////////////////////////////////////////////////////////////////////////