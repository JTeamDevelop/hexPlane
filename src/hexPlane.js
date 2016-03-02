var TERRAIN = [{name:"Mountains",color:"brown"}, {name:"Water",color:"blue"}, {name:"Forest",color:"green"}
  , {name:"Plains",color:"tan"}];

Array.prototype.random = function () {
  var i = Math.random()*this.length;
  return this[Math.floor(i)];
}

//random value map - min & max bound all ponts
//bias is the most likely value, influence is between 0 & 1 and refelcts how strong bias will be
function getRndBias(min, max, bias, influence) {
    var rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return rnd * (1 - mix) + bias * mix;           // mix full range and bias
}

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

var hexPlaneMap = function () {
  this._width = 1200;
  this._height = 800;
  this._hexSize = 10;
  this._pointy = true;

  //variables for random map - min & max bound ponts
  //bias is the most likely value, influence is between 0 & 1 and refelcts how strong bias will be
  this._min = 1000, this._max = 4000, this._bias = 2000, this._influence = 1;
  
  this._randomMapSize = function () {
    var r = Math.floor(Math.random()*14)+2;
    return r;
  }
  this._randomZoneSize = function () {
    var r = Math.floor(Math.random()*14)+2;
    return r;
  }

  // [.86,.5][0,1][-.866,.5][-.866,-.5][0,-1][.866,-.5]
  this.std_n = [[0,1],[-1,1],[-1,0],[0,-1],[1,-1],[1,0]];

  this.cells = {};
  this.zones = [];
}
hexPlaneMap.prototype.random = function () {
  var n = Math.floor(getRndBias(this._min, this._max, this._bias, this._influence));
  this._rndC = n;

  var i=0, c=0;
  while(i<n) {
    c = this.addZone();
    i+=c;
  }

  this._actualC = i;

}
hexPlaneMap.prototype.center = function () {
  return [this._width/2,this._height/2];
}
hexPlaneMap.prototype.rawcells = function () {
  var cell = [], i=0;
  for (var c in this.cells) {
    cell.push([this.cells[c].x,this.cells[c].y]);
    cell[i].zone = this.cells[c].zone;
    i++;
  }

  return cell;
}
//axial neighboors
hexPlaneMap.prototype.neighboors = function (cell) {
  var d = [];
  for (var i = 0; i < 6; i++) {
    d.push(this.edge(cell,i));
  }
  return d;
};
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

  return {points:p, ncell:ncell, edge:edge, nzone: nzone};
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
hexPlaneMap.prototype.addZone = function () {
  var size = this._randomZoneSize();
  var nz = this.zones.length;
  var Z = new Zone(this,nz), rZ = this.zones.random(), ne=null;

  for (var i = 0; i < size; i++) {
    //new map - first cell is at 0,0
    if(nz==0 && i==0) {
      new HCell(Z,0,0,0);
    }
    else {
      //first cell in new zone has to start at a random zone
      if(i==0) {
        while (ne==null) {
          ne = rZ.rndNewEdge();
          rZ = this.zones.random();
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
      new HCell(Z,ne[0],ne[1],0);
    }
  }
  this.zones.push(Z);
  return size;
};
hexPlaneMap.prototype.display = function () {
  var map = this;
  var svg = d3.select("body").append("svg")
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
      return TERRAIN[map.zones[cell.zone].terrain].color;
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
  this.terrain = Math.floor(Math.random()*TERRAIN.length);
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
    var ncell = d.random(), nidx = this.map.std_n;
    ncell = [ncell[0].x+nidx[ncell[1]][0],ncell[0].y+nidx[ncell[1]][1]];

    return ncell;
  }
};

var HCell = function (zone,x,y,terrain) {
  this.x = x;
  this.y = y;
  this.terrain = terrain;
  this.zone=zone.id;

  zone.map.cells[x+","+y] = this;
  zone.cells.push(x+","+y);
}

var map = new hexPlaneMap();
map.random();
console.log(map);
map.display();

