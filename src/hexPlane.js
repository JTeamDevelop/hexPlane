/*

    A hex plane random generator

    This is free because the grace of God is free through His son Jesus.

	The code is Copyright (C) 2016 JTeam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>

*/

var TERRAIN = [{name:"Water",color:"blue"}, {name:"Mountains",color:"brown"},  {name:"Forest",color:"DarkGreen"}
  , {name:"Plains",color:"LightGreen"}, {name:"Desert",color:"Khaki"}];

//makes a unique id for various objects that is n characters long
makeUID = function (n) {
	n = typeof n === "undefined" ? 24 : n;
	var text = "";
	var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
	
	for( var i=0; i < n; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	
   	return text;
};

RNG = function(seed){
	this.seedrnd = typeof seed === "undefined" ? Math.random : new xor4096(seed);
	this.random=this.seedrnd;

};
RNG.prototype.rndInt = function (min, max) {
    return Number(Math.floor(this.seedrnd() * (max - min + 1)) + min);
}
RNG.prototype.multiRoll = function (min, max, num) {
    var x=0;
	for(var i=0;i<num;i++){
		x+=this.rndInt(min, max);
	}
    return x;
}
RNG.prototype.FateRoll = function (){ return this.multiRoll (1, 3, 4)-8; }
RNG.prototype.rndArray = function (array) {
	if (!array.length) { return null; }
	return array[Math.floor(this.RND() * array.length)];
}
// @returns {array} New array with randomized items
RNG.prototype.shuffleAr = function (array) {
  	var currentIndex = array.length, temporaryValue, randomIndex ;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(this.seedrnd() * currentIndex);
    	currentIndex -= 1;

    	// And swap it with the current element.
    	temporaryValue = array[currentIndex];
    	array[currentIndex] = array[randomIndex];
    	array[randomIndex] = temporaryValue;
  	}

  	return array;
}
//random value map - min & max bound all ponts
//bias is the most likely value, influence is between 0 & 1 and refelcts how strong bias will be
RNG.prototype.RNDBias = function (min, max, bias, influence) {
    var rnd = this.random() * (max - min) + min,   // random in range
        mix = this.random() * influence;           // random mixer
    return rnd * (1 - mix) + bias * mix;           // mix full range and bias
}

Array.prototype.random = function (RNG) {
	RNG = typeof RNG === "undefined" ? Math : RNG;
  var i = RNG.random()*this.length;
  return this[Math.floor(i)];
}
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

function polygon(d) {
  return "M" + d.join("L") + "Z";
}
function line(d) {
  return "M" + d.join("L") + "Z";
}

drawCell = function (map,pos) {
  var width = map._hexSize * 2, horiz = 0 , height = 0, vert = 0;
  var pointy = 30, c=map.center(), angle_deg = 0, angle_rad = 0, p = [], d=[];

  //convert cube to even-r offset
  //col = x + (z + (z&1)) / 2
  //row = z
  var x = pos[0], z=pos[1], y=0;
  x=x + (z + (z&1)) / 2;
  y=z;

  if (map._pointy) {
    horiz = width*Math.sqrt(3)/2 , vert = width*3/4;
    pointy = 30;
  }
  else {
    horiz = width*3/2 , vert = width*Math.sqrt(3)/4;
    pointy = 0;
  }

  if(Math.abs(y)%2 == 1) {
    x = c[0]+x*horiz-horiz/2;
    y = c[1]+y*vert;
  }
  else {
    x = c[0]+x*horiz;
    y = c[1]+y*vert;
  }

  //flat topped angles are 0°, 60°, 120°, 180°, 240°, 300° and
  //pointy topped angles are 30°, 90°, 150°, 210°, 270°, 330°.
  for (var i = 0; i < 6; i++) {
    angle_deg = 60 * i + pointy;
    angle_rad = Math.PI / 180 * angle_deg;
    d.push([x + map._hexSize * Math.cos(angle_rad),
                 y + map._hexSize * Math.sin(angle_rad)]);
  }
  return polygon(d);
}

var hexPlaneMap = function (seed) {
  this.uid = typeof seed === "undefined" ? makeUID() : seed;
  this.RNG = new RNG(this.uid);

  this._width =document.getElementById('hexPlane').offsetWidth*.95;
  this._height = document.getElementById('hexPlane').offsetHeight*.95;
  this._hexSize = 10;
  this._pointy = true;
  this._useZones = false;
  this._water = 0.3;

  this._probTerrain = [1,1,1,2,2,2,2,3,3,3,4];

  //variables for random map - min & max bound ponts
  //bias is the most likely value, influence is between 0 & 1 and refelcts how strong bias will be
  this._min = 900, this._max = 2700, this._bias = 1800, this._influence = 1;

	var map = this;
  this._randomMapSize = function () {
    var r = Math.floor(map.RNG.random()*14)+2;
    return r;
  }
  this._randomZoneSize = function () {
    var r = Math.floor(map.RNG.random()*14)+2;
    return r;
  }

  // [.86,.5][0,1][-.866,.5][-.866,-.5][0,-1][.866,-.5]
  this.std_n = [[0,1],[-1,1],[-1,0],[0,-1],[1,-1],[1,0]];

  this.cells = {};
  this.zones = [];
}
hexPlaneMap.prototype.random = function () {
  var n = Math.floor(this.RNG.RNDBias(this._min, this._max, this._bias, this._influence));
  this._rndC = n;

  if(this._useZones) {
    var i=0, c=0;
    while(i<n) {
      c = this.addZone();
      i+=c;
    }
    this._actualC = i;
  }
  else{
    for(var i =0; i<n ; i++) {
      this.addCell();
    }
    this.makeTerrain();
  }
}
hexPlaneMap.prototype.center = function () {
  return [this._width/2,this._height/2];
}
hexPlaneMap.prototype.rawcells = function () {
  var cell = [], i=0, terrains=[0,0,0,0];
  for (var c in this.cells) {
    cell.push([this.cells[c].x,this.cells[c].y]);
    cell[i].zone = this.cells[c].zone;
    cell[i].terrain = this.cells[c].terrain;
    i++;
    terrains[this.cells[c].terrain]++;
  }
  console.log(terrains);

  return cell;
}
//axial neighboors
hexPlaneMap.prototype.neighboors = function (cell) {
  //n will be all neighboors, o will be open cells
  var n = [], o=[], e={};
  for (var i = 0; i < 6; i++) {
    e = this.edge(cell,i)
    if(e.ncell == null) {
      o.push(e);
    }
    else {
      n.push(e);
    }
  }
  return {n:n,o:o};
};
hexPlaneMap.prototype.points = function (cell,i) {
  cell = this.cells[cell];
  //convert cube to even-r offset for point calculations
  //col = x + (z + (z&1)) / 2
  //row = z
  var x = cell.x, z=cell.y, y=0;
  x=x + (z + (z&1)) / 2;
  y=z;

  var width = this._hexSize * 2, horiz = 0 , height = 0, vert = 0;
  var pointy = 30, c=this.center(), angle_deg = 0, angle_rad = 0, p = [];
  if (this._pointy) {
    horiz = width*Math.sqrt(3)/2 , vert = width*3/4;
    pointy = 30;
  }
  else {
    horiz = width*3/2 , vert = width*Math.sqrt(3)/4;
    pointy = 0;
  }

  if(Math.abs(y)%2 == 1) {
    x = c[0]+x*horiz-horiz/2;
    y = c[1]+y*vert;
  }
  else {
    x = c[0]+x*horiz;
    y = c[1]+y*vert;
  }

  //flat topped angles are 0°, 60°, 120°, 180°, 240°, 300° and
  //pointy topped angles are 30°, 90°, 150°, 210°, 270°, 330°.
  // [.86,.5][0,1][-.866,.5][-.866,-.5][0,-1][.866,-.5]
  var ni = i+2;
  for (i; i < ni; i++) {
    angle_deg = 60 * i + pointy;
    angle_rad = Math.PI / 180 * angle_deg;
    p.push([x + this._hexSize * Math.cos(angle_rad),
                 y + this._hexSize * Math.sin(angle_rad)]);
  }

  return p;
}
hexPlaneMap.prototype.edge = function (cell,i) {
  cell = this.cells[cell];
  //neighboor cell to the edge
  var n = this.std_n, nx = cell.x+n[i][0], ny=cell.y+n[i][1],
    cid = nx+","+ny, ncell = null, edge=true, nzone=-1;
  if(typeof this.cells[cid] !== "undefined") {
    edge = false;
    ncell = this.cells[cid];
    nzone = cell.zone;
    if(cell.zone != ncell.zone) {
      edge = true;
      nzone = ncell.zone;
    }
  }

  return {i:i, ncell:ncell, ncoord:[nx,ny], id:cid, edge:edge, nzone: nzone};
}
hexPlaneMap.prototype.zoneEdges = function () {
  var e=[],p=[];
  for (var i = 0; i < this.zones.length; i++) {
    e=this.zones[i].edge().e;
    for (var j = 0; j < e.length; j++) {
      p.push(e[j][2].points);
    }
  }
  return p;
}
hexPlaneMap.prototype.addCell = function () {
  //cA pushes index of all cells, c holds the random cell, o is the empty neighboors
  var cA=[], c = "", o="", newCell = "";
  for(var x in this.cells) {
    cA.push(x);
  }

  if(cA.length==0){
    this.cells["0,0"] = new HCell(0,0,-1);
  }
  else {
    while (newCell.length==0) {
      c = cA.random(this.RNG);
      o = this.neighboors(c).o;
      if(o.length != 0) {
        o = o.random(this.RNG);
        newCell = o.ncoord[0]+","+o.ncoord[1];
        this.cells[newCell] = new HCell(o.ncoord[0],o.ncoord[1],-1);
      }
    }
  }
}
hexPlaneMap.prototype.makeTerrain = function () {
  //cA pushes index of all cells
  //Then we pick 5 to 10 points to start and add terrain
  var map = this, cA=[], points = [];
  
  for(var x in this.cells) {
    cA.push(x);
  }
  var land = Math.floor(cA.length*(1-this._water));

  function noTerrainNeighboors(cell) {
    var N=map.neighboors(cell).n, noTerrain=[];

    N.forEach(function(c){
      if(c.ncell.terrain == -1) {
        noTerrain.push(c);
      }
    })

    return noTerrain;
  }

  function terrainZone(p) {
    var nc = map.RNG.rndInt(3,25), T=map._probTerrain.random(map.RNG), zone=[], neighboors=[], noTerrain=[], rndCell="";
    zone.push(p);
    
    if(points.length + nc > land) {
      nc = land - points.length;
    }

    while(zone.length < nc) {
      noTerrain=[];
      zone.forEach(function(id){
        noTerrain= noTerrain.concat(noTerrainNeighboors(id)).unique();
      });

      if(noTerrain.length==0) {
        break;
      }
      else {
        rndCell = noTerrain.random(map.RNG);
        map.cells[rndCell.id].terrain = T;
        zone.push(rndCell.id);
        points.push(rndCell.id);
      }
    }
    
  }

  function initialize() {
    var nI= map.RNG.rndInt(3,7), initial = [], cell = "";  

    while (initial.length < nI) {
      cell=cA.random(map.RNG);
      
      if(initial.indexOf(cell)==-1) {
        initial.push(cell);
        terrainZone(cell);
      }
    }     
  }

  initialize();

  while (points.length < land*2/3) {
    terrainZone(points.random(map.RNG));
  }

  var origin="", noTerrain=[];
  for(var i = points.length; i<land ; i++) {
    origin=points.random(map.RNG);
    noTerrain=noTerrainNeighboors(origin);

    while(noTerrain.length==0) {
      origin=points.random(map.RNG);
      noTerrain=noTerrainNeighboors(origin);
    }
    
    cell=noTerrain.random(map.RNG);
    points.push(cell.id);
    map.cells[cell.id].terrain=map.cells[origin].terrain;
  }
  
  for(var i = 0; i<cA.length ; i++) {
    cell = this.cells[cA[i]];
    if(cell.terrain == -1){
      cell.terrain = 0;
    }
  }


}
hexPlaneMap.prototype.addZone = function () {
  var size = this._randomZoneSize();
  var nz = this.zones.length;
  var Z = new Zone(this,nz), rZ = this.zones.random(this.RNG), ne=null;

  for (var i = 0; i < size; i++) {
    //new map - first cell is at 0,0
    if(nz==0 && i==0) {
      new HCell(0,0,0,Z);
    }
    else {
      //first cell in new zone has to start at a random zone
      if(i==0) {
        while (ne==null) {
          ne = rZ.rndNewEdge();
          rZ = this.zones.random(this.RNG);
        }
      }
      //otherwise we get edges from the zone
      else {
        ne = Z.rndNewEdge();
        //if no edges - it is encased, move one to new zone
        if (ne==null){
          break;
        }
      }
      new HCell(ne[0],ne[1],0,Z);
    }
  }
  this.zones.push(Z);
  return size;
};
hexPlaneMap.prototype.display = function () {
  var map = this;
  var svg = d3.select("#hexPlane").append("svg")
    .attr("width", map._width)
    .attr("height", map._height);

  var path = svg.append("g").classed({'gHex': true})
    .selectAll("path")
    .data(map.rawcells(), function(cell){
      return drawCell(map,cell);
    })
    .enter().append("path")
    .classed({'voronoi': true})
    .style({fill: function (cell) {
      if(cell.terrain>-1) {
        return TERRAIN[cell.terrain].color;
      }
    }})
    .attr("d", function(cell){
      return drawCell(map,cell);
    })
    .order()
    .on("dblclick", function(){
      //d3.selectAll(".voronoi").classed({'selected': false});
      //d3.select(this).classed({'selected': true});
      //d3.select(this).style({fill: "yellow"});
      var vPoly = d3.select(this).datum();
      console.log(this);
    });
}

var Zone = function (map,i) {
  this.map=map;
  this.id=i;
  this.cells=[];
  this.terrain = Math.floor(map.RNG.random()*TERRAIN.length);
}
Zone.prototype.edge = function () {
  var d = [], e=[], n = {}, cell = {};

  for (var i = 0; i < this.cells.length; i++) {
    cell = this.map.cells[this.cells[i]];
    n = this.map.neighboors(this.cells[i]);
    for (var j = 0; j < 6; j++) {
      if(n[j].nzone == -1) {
        d.push([cell,j,n[j]]);
      }
      if(n[j].edge) {
        e.push([cell,j,n[j]]);
      }
    }
  }

  return {d:d,e:e};
}
Zone.prototype.rndNewEdge = function () {
  var d = this.edge().d;

  if(d.length == 0) {
    return null;
  }
  else {
    var ncell = d.random(this.map.RNG), nidx = this.map.std_n;
    ncell = [ncell[0].x+nidx[ncell[1]][0],ncell[0].y+nidx[ncell[1]][1]];

    return ncell;
  }
};

var HCell = function (x,y,terrain,zone) {
  this.x = x;
  this.y = y;
  this.terrain = terrain;
  this.zone = -1;

  if(zone === "undefined") {
    this.zone = zone.id;
    zone.map.cells[x+","+y] = this;
    zone.cells.push(x+","+y);
  }
}

var map = new hexPlaneMap();
map.random();
console.log(map);
map.display();
