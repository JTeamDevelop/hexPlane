hexPlaneMap.prototype.empires = function () {
  var map = this, empires={}, cid = "", pop={};
  var hcolor=HTMLCOLOR.slice(0);

  var major = [];
  for (var x in map._population) {
    pop=map._population[x];

    if(pop.size >4) {
      major.push(x);
    }
  }

  function name() {
    var nsys = [1,2,2,3,3,3,4];
    return NameGenerator(map.RNG);
  }

  function initialize() {
    var ap=0, power=0, color="";
    for (var i = 0; i < major.length; i++) {
      cid=major[i];
      pop=map._population[cid];
      //assign power
      power=pop.size-4
      //assign a color
      color = map.RNG.rndColor();
      //load basic empire data
      empires[cid]={name:name(),color:color,power:power,cells:[cid]};
      map.cells[cid].pop = {size:4};
      map.cells[cid].empire = cid;
    }
  }

  initialize();

  //absorb the neighboors
  function absorb (cid,x) {
    var N = map.neighboors(cid).n, cell={}, pop={}, absorbed=false, i=0;
    for (var i = 0; i < N.length; i++) {
      cell = N[i].ncell;
      //if there is a pop and it isn't in an empire
      if (typeof cell.pop !== "undefined" && typeof cell.empire === "undefined")  {
        pop = map._population[N[i].id];
        //add empire to cell
        cell.empire = x;
        //it did absorb a cell
        absorbed = true;
        //add cell to empire
        empires[x].cells.push(N[i].id);
        //add cell's power if greater than 3
        if(pop.size>3) {
          empires[x].power=pop.size-3;
          cell.pop = {size:3};
        }
      }

      if (typeof cell.site !== "undefined" || typeof cell.ruin !== "undefined")  {
        if(typeof cell.empire === "undefined") {
          //add empire to cell
          cell.empire = x;
          //it did absorb a cell
          absorbed = true;
          //add cell to empire
          empires[x].cells.push(N[i].id);
          cell.pop = {size:1};
          //add cell's power
          if(typeof cell.site !== "undefined") {
            empires[x].power=cell.site.size-1;
          }
        }
      }
    }
    return absorbed;
  }

  var nC={}, ecid= "",ar=[],count=0;
  for(var x in empires) {
    count=0;
    //when they run out of power the empire has expanded fully
    while (empires[x].power>0) {
      count++;
      //no endless loops
      if(count>100){
        break;
      }
      //pick a random cell in the empire
      ecid = empires[x].cells.random(map.RNG);
      //absorb neighboors
      if (!absorb(ecid,x)) {
        //80% of absorbing new cell
        if(map.RNG.random()<0.75) {
          //get the cell's neighboors
          nC=map.neighboors(ecid).n.random(map.RNG);
          //add empire data to an empty cell
          if(typeof nC.ncell.empire === "undefined") {
            nC.ncell.pop = {size:1}
            nC.ncell.empire = x;
            empires[x].cells.push[nC.id];
            empires[x].power--;
          }
        }
        else {
          //add power to current cell pop
          cell = map.cells[ecid];
          if(cell.pop.size <2){
            cell.pop.size++;
            empires[x].power--;
          }
          else if (cell.pop.size==3) {
            if(map.RNG.random()<0.25){
              cell.pop.size++;
              empires[x].power--;
            }
          }
          else if (cell.pop==4) {
            if(map.RNG.random()<0.05){
              cell.pop.size++;
              empires[x].power--;
            }
          }
        }
      }
    }
  }

  //load the rest as singular empires
  for (var x in map._population) {
    pop=map._population[x];
    if(!objExists(map.cells[x].empire)){
      //assign a color
      color = map.RNG.rndColor();
      //load basic empire data
      empires[x]={name:name(),color:color,power:0,cells:[x]};
      map.cells[x].pop = {size:pop.size};
      map.cells[x].empire = x;
    }
  }

  map.empires = empires;
}
////////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.empireDoom = function (eid) {
  var empire = this.empires[eid], doom=false;
  for (var i = 0; i < empire.cells.length; i++) {
    if(this.cells[empire.cells[i]].tags.contains("Doom")){
      doom = true;
    }
  }
  return doom;
}
hexPlaneMap.prototype.empireNeighboors = function (eid) {
  var empire = this.empires[eid], nC=[], N=[];
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
  var empire = this.empires[eid], aggro=-8, pop={};
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      pop = this._population[empire.cells[i]];
      if(pop.aggro>aggro) {
        aggro = pop.aggro;
      }
    }
  }
  return aggro;
}
hexPlaneMap.prototype.empirePop = function (eid) {
  var empire = this.empires[eid], pop={};
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      pop[empire.cells[i]] = this._population[empire.cells[i]];
    }
  }
  return pop;
}
hexPlaneMap.prototype.empirePopColors = function (eid) {
  var empire = this.empires[eid], colors=[];
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      colors = colors.concat(this._population[empire.cells[i]].colors);
    }
  }
  return colors;
}
////////////////////////////////////////////////////////////////////////////////////////////////
