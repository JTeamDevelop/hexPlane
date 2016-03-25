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
var CLIMATE = [{name:"Artic",color:"blue"}, {name:"Continental",color:"LightBlue"},  {name:"Temperate",color:"green"}
    , {name:"Subtropical",color:"LightGreen"}, {name:"Tropical",color:"DarkGreen"}];


d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};
d3.selection.prototype.moveToBack = function() {
	return this.each(function() {
		var firstChild = this.parentNode.firstChild;
		if (firstChild) {
			this.parentNode.insertBefore(this, firstChild);
		}
	});
};

cellCenter = function (map,pos) {
  var width = map._hexSize * 2, horiz = 0 , height = 0, vert = 0;
  var c=map.center();

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

  return [x,y];
}

drawCell = function (map,pos) {
  var pointy = 30, angle_deg = 0, angle_rad = 0, d=[];
	var cC = cellCenter(map,pos);

  if (map._pointy) {
    pointy = 30;
  }
  else {
    pointy = 0;
  }

  //flat topped angles are 0°, 60°, 120°, 180°, 240°, 300° and
  //pointy topped angles are 30°, 90°, 150°, 210°, 270°, 330°.
  for (var i = 0; i < 6; i++) {
    angle_deg = 60 * i + pointy;
    angle_rad = Math.PI / 180 * angle_deg;
    d.push([cC[0] + map._hexSize * Math.cos(angle_rad),
                 cC[1] + map._hexSize * Math.sin(angle_rad)]);
  }
  return polygon(d);
}

function population(map) {
	var rarity = ["common","uncommon","rare","mythic"];
	var d = [
		["Alara",["Shards of Alara","ALA",101,60,53,15],["Conflux","CON",60,40,35,10],["Alara Reborn","ARB",60,40,35,10]],
		["Zendikar",["Zendikar","ZEN",101,60,53,15],["Worldwake","WWK",60,40,35,10],["Rise of the Eldrazi","ROE",100,60,53,15]]
	];
	var b = [
		["Magic 2010","M10",101,60,53,15],
		["Magic 2011","M11",101,60,53,15]
	];

	var cd = d.random(map.RNG), cb = b.random(map.RNG);

	var pop = {c:[],u:[],r:[],m:[],n:0,i:0}, url='https://api.deckbrew.com/mtg/cards?set=', curl='';
	function loadPop (data,rarity){
		data = JSON.parse(data);
		pop[rarity[0]] = pop[rarity[0]].concat(data);
		pop.i++;
		if(pop.n==pop.i){
			map.populate(pop);
		}
	}

	for(var i=1; i<cd.length;i++) {
		curl = url+cd[i][1];
		for(var j=0; j<4; j++){
			for(var k=0; k<cd[i][2+j]/100; k++){
				httpGetAsync(curl+'&rarity='+rarity[j]+'&page='+k, loadPop,rarity[j]);
				pop.n++;
			}
		}
	}

	curl = url+cb[1];
	for(var j=0; j<4; j++){
		for(var k=0; k<cb[2+j]/100; k++){
			httpGetAsync(curl+'&rarity='+rarity[j]+'&page='+k, loadPop,rarity[j]);
			pop.n++;
		}
	}

}

function rarity(RNG) {
	function rare (){
		var r= ["r","r","r","r","r","r","r","m"];
		return r.random(RNG);
	}
	var b= ["l","c","c","c","c","c","c","c","c","c","c","u","u","u",rare()];

	return b.random(RNG);
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
  this.pop = [];
  this.zones = [];
}
hexPlaneMap.prototype.random = function () {
  this.name = nameGen(this.RNG).capFirst();
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
    this.makeClimate();
  }

	var map = this;
  	var rpop = population(map);

}
hexPlaneMap.prototype.populate = function (rpop) {
	var cA=[], cPop=[], cell="", r="", card ={}, tracker={l:0,c:0,u:0,r:0,m:0};
	for(var x in this.cells) {
		cA.push(x);
	}
	var n = Math.round(this._rndC/10);
	while (cPop.length < n){
		cell = cA.random(this.RNG);
		if(cPop.indexOf(cell) == -1){
      cPop.push(cell);
			r = rarity(this.RNG);
			if(r!="l"){
				card = rpop[r].random(this.RNG);
				this.cells[cell].pop = {
					rarity:r,
					cell:cell,
					types:card.types,
					subtypes:card.subtypes,
					cmc:card.cmc,
					colors:card.colors,
					pow:card.power,
					tough:card.toughness
				};
			}
			tracker[r]++;
		}
	}
	console.log(tracker);
	this.popDisplay();
}
hexPlaneMap.prototype.center = function () {
  return [this._width/2,this._height/2];
}
hexPlaneMap.prototype.rawcells = function () {
  var cell = [], i=0, terrains=[0,0,0,0,0];
  for (var c in this.cells) {
    cell.push([this.cells[c].x,this.cells[c].y]);
    cell[i].data = this.cells[c]
    i++;
    terrains[this.cells[c].terrain]++;
  }
  console.log(terrains);

  return cell;
}
hexPlaneMap.prototype.popData = function () {
  var pop = [], i=0;
  for (var c in this.cells) {
  	if(Object.keys(this.cells[c].pop).length != 0){
  		pop.push([this.cells[c].x,this.cells[c].y]);
    	pop[i].data = this.cells[c].pop;
    	i++;
  	}
  }

  return pop;
}
//axial neighboors
hexPlaneMap.prototype.neighboors = function (cell) {
  //n will be neighboors, o will be open cells
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
hexPlaneMap.prototype.makeClimate = function () {
  var map = this, cA=[], done=[], cell = "";

  //put all the cells in an array for random selection
  for(var x in this.cells) {
    cA.push(x);
  }

  function initialize() {
    //number of climate zones
    var nz= map.RNG.rndInt(4,12);

    for (var i = 0; i < nz; i++) {
      //for each zone find a random cell
      cell=cA.random(map.RNG);
      done.push(cell);
      //set climate of cell
      map.cells[cell].climate=map.RNG.rndInt(0,4);
      //remove the cell from the array so it can't be selected again
      cA.remove(cell);
    }
  }

  initialize();

  var N = {};
  while (cA.length > 0) {
    cell = done.random(map.RNG);
    N = map.neighboors(cell);
    N = N.n.random(map.RNG);
    if (N.ncell.climate == -1) {
      N.ncell.climate = map.cells[cell].climate;
      cA.remove(N.id);
      done.push(N.id);
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

  var hex = svg.append("g").classed({'gHex': true})
    .selectAll("path")
    .data(map.rawcells(), function(cell){
      return drawCell(map,cell);
    })
    .enter().append("path")
    .classed({'hex': true})
    .style({fill: function (cell) {
        if(cell.data.terrain>-1) {
          return TERRAIN[cell.data.terrain].color;
        }
      }})
    .attr("d", function(cell){
      return drawCell(map,cell);
    })
    .attr("title", function(cell){
      return "Hex";
    })
    .order()
    .on("click", function(){
      var hex = d3.select(this).datum();
      console.log(hex);
    });

    var hinfo = "<h1>"+this.name+"</h1>";
    hinfo+="<strong>Seed: </strong>"+this.uid;
    hinfo+="<h3>Views</h3><span>Climate</span></br><span>Population</span></br><span>Ruins</span>";

    d3.select("#hexPlane").append("div")
      .attr("id", "pInfo")
      .html(hinfo);
}

hexPlaneMap.prototype.popDisplay = function () {
	var svg = d3.select("svg");

	var pop = svg.append("g").classed({'gPop': true})
    .selectAll("circle")
    .data(map.popData(), function(pop){
      return cellCenter(map,pop);
    })
    .enter().append("circle")
    .classed({'pop': true})
	.attr("cx", function(pop){
      return cellCenter(map,pop)[0];
    })
    .attr("cy", function(pop){
      return cellCenter(map,pop)[1];
    })
    .attr("r", function(pop){
      return pop.data.cmc;
    })
    .style({fill: function (pop) {
    	return "red";
    }})
    .order()
    .on("click", function(){
		var sel = d3.select(this);
  		sel.moveToFront();
      	var pop = d3.select(this).datum();
      	console.log(pop);
    });

	$('path.hex').tooltipsy({
		content: function(cell) {
			var data = cell[0].__data__.data;
			var html="<strong>"+TERRAIN[data.terrain].name+"</strong>";

			if(Object.keys(data.pop).length != 0){
				var pop = cell[0].__data__.data.pop;
				for(var i=0;i<pop.types.length;i++) {
					if(pop.types[i] == "sorcery" || pop.types[i] == "instant") {
						html+="</br>Magic";
					}
					else {
						html+="</br>"+pop.types[i].capFirst();
					}
				}
			}

			return html;
		}
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
  this.climate = -1;
  this.zone = -1;
  this.pop = {};

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
