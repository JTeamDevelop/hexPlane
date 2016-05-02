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
var HTMLCOLOR = ["AntiqueWhite","Blue","Brown","Chartreuse","Chocolate","Coral","Crimson","Cyan","DarkBlue","DarkGreen"
    ,"Orange","DarkViolet","DeepPink","Gold","Green","Indigo","DeepSkyBlue","Lime","MediumPurple","OrangeRed","Orchid"
    ,"Purple","Red","Yellow"];
var POPSIZE = ["Villages","Towns","Cities","Large City","Metropolis"];
var NATIONSAVE = {"Disorder":["Guard","Barracks"], "Uprising":["Army","Army"], "Poverty":["Merchant","Market"]
    , "Ignorance":["Scholar","School"], "Despair":["Minister","Church"], "Corruption":["Magistrate","Court"]};

/////////////////////////////////////////////////////////////////////////////////
function newCard(RNG){
    var card={}, multi={c:1,u:1.5,r:3,m:6};
    var r= ["r","r","r","r","r","r","r","m"];
    var b= ["c","c","c","c","c","c","c","c","c","c","u","u","u","u",r.random(RNG)];
  	card.rarity = b.random(RNG);

    function sC() {
      return [COLORS.random(RNG)];
    }
    function mC() {
      var m = [3,3,3,3,3,4,4,5], nc = [2,2,2,m.random(RNG)], n = nc.random(RNG);
      var c=[];
      for (var i = 0; i < n; i++) {
        c.push(COLORS.random(RNG));
      }
      return c;
    }

    var c =[sC,sC,sC,sC,sC,sC,sC,sC,sC,mC];
    card.colors = c.random(RNG)();

    card.tags = [];
    var rt=["land","land","land","artifact","artifact","artifact","superhero"];
    var t=["creature","power",rt.random(RNG)];
    card.tags.push(t.random(RNG));

    if(!card.tags.contains("artifact")){
      if(!card.tags.contains("superhero")){
        if(RNG.random()<0.05){
          card.tags.push("artifact");
        }
      }
    }
    if(RNG.random()<0.02){
      card.tags.push("legendary");
    }

    var power = {
      c:[1,6,1,0.75],
      u:[1,10,2,0.65],
      r:[2,20,4,0.75],
      m:[3,20,5,0.75]
    },
      bias=[];

    if(card.tags.contains("land")){
      card.power = multi[card.rarity];
    }
    else {
      bias = power[card.rarity];
      card.power = multi[card.rarity]*RNG.RNDBias(bias[0], bias[1], bias[2], bias[3]);
    }

    return card;
}

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

var hexPlaneMap = function (seed) {
  this.uid = typeof seed === "undefined" ? makeUID(27) : seed;
  this.RNG = new RNG(this.uid);

  this._width =document.getElementById('hexPlane').offsetWidth*.95;
  this._height = document.getElementById('hexPlane').offsetHeight*.95;
  this._hexSize = 8;
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
  //action queue
  this._queue={};
  this._set={};
  this._sites={};
  this._ruins={};
  this._people={};
  this._population={};
  this._doom = {};
  this._artifacts = {};
  this._empires={};
  this._zones = [];
  //time is total days
  this._time=0;

  this._heroes = {};
  this._currentHero = {};
  this._currentEncounter = [];
}
hexPlaneMap.prototype.noPopCell = function () {
  var cA = [];
  for (var x in this.cells) {
    if(!objExists(this.cells[x].pop)){
      cA.push(x);
    }
  }
  return cA.random(this.RNG);
}
hexPlaneMap.prototype.cellArray = function () {
  var cA = [];
  for (var x in this.cells) {
    cA.push(x);
  }
  return cA;
}
hexPlaneMap.prototype.cellsByTerrain = function () {
  var cA = {water:[],land:[],"0":[],"1":[],"2":[],"3":[],"4":[]};
  for (var x in this.cells) {
    cA[this.cells[x].terrain].push(x);
    if(this.cells[x].terrain == 0){
      cA.water.push(x);
    }
    else {
      cA.land.push(x);
    }
  }
  return cA;
}
//Find cells within distance X to the provided cell
hexPlaneMap.prototype.cellWithinX = function (cid,x) {
  var cell= {}, ncid = "", cA=[[cid]];
  cA.all=[cid];
  //loop through up to distance x
  for (var i = 1; i < x+1; i++) {
    //push a new array to cA representing cells at that distance
    cA.push([]);
    //loop  through cells at the previous distance
    for (var j = 0; j < cA[i-1].length; j++) {
      //load cell
      cell = this.cells[cA[i-1][j]];
      //loop through cell neighboors
      for (var k = 0; k < this.std_n.length; k++) {
        ncid = (Number(cell.x)+this.std_n[k][0])+","+(Number(cell.y)+this.std_n[k][1]);
        //if cell not added before add it now
        if(!cA.all.contains(ncid)){
          cA[i].push(ncid);
          cA.all.push(ncid);
        }
      }
    }

  }
  return cA;
}
hexPlaneMap.prototype.random = function (opts) {
  opts = typeof opts === "undefined" ? {} : opts;
  opts.display = typeof opts.display === "undefined" ? false : opts.display;

  this.name = this.RNG.rndName();
  if(opts.display){
    map.displaySetup();
  }

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
    this.makeClimate(opts.display);
  }

}
hexPlaneMap.prototype.makeArtifact = function (card) {
  card = typeof card === "undefined" ? newCard(this.RNG) : card;
  var uid = makeUID(6,this.RNG);
  var artifact = {
    uid: uid,
    rarity:card.rarity,
    power:card.power,
    tags:this.colorTags(card)
  }
  this._artifacts[uid]=artifact;
  return artifact;
}
hexPlaneMap.prototype.colorTags = function (card) {
  var tags = [];
  var T = {
    white:["Light","Healing","Defense","Protection","Law","Peace","Community","Equality"],
    green:["Water","Air","Ice","Illusion","Divination","Logic","Knowledge","Trickery","Control"],
    red:["Life","Nature","Forests","Beasts","Transmutation","Strenth","Growth","Regeneration"],
    yellow:["Fire","Earth","Storms","Conjuration","Evocation","War","Fury","Chaos","Creativity"],
    black:["Darkness","Death","Illness","Necromancy","Corruption","Destruction","Domination","Greed"],
    gray:["Artifice","Machines","Technology","Golems"]
  }

  //push a color tag for every color
  for (var i = 0; i < card.colors.length; i++) {
    tags.push(T[card.colors[i]].random(map.RNG));
  }
  //if the size is greater than the number of colors push more tags
  var max = Math.floor(card.power/3);
  if(max>card.colors.length) {
    var l = max-card.colors.length, nt="";
    for (var i = 0; i < l; i++) {
      //random color random tag
      tags.push(T[card.colors.random(map.RNG)].random(map.RNG));
    }
  }
  return tags;
}
hexPlaneMap.prototype.makeAssets = function (cell,aggro) {
  var map=this, cid = cell.x+","+cell.y, N = this.neighboors(cid), armyn = cell.pop.assets.count("Army");

  //Determine if the cell is next to water or is water itself.
  var water = false;
  for (var i = 0; i < N.length; i++) {
    if(N[i].ncell.terrain == 0) {
      water = true;
    }
  }
  if(cell.terrain == 0) {
    water = true;
  }

  var basic = ["Barracks","Church","Court","Market","Industry","School"];
  if(water) {
    basic.push("Harbor");
  }

  if(armyn < aggro+1) {
    basic = basic.concat(["Army","Army"]);
  }

  var special = ["Foundry","Fortified","Weaponsmiths","Armorsmiths","Lab","Militia","Tower","Monastery","Library","Demigod"];
  if(water) {
    special.push("Shipyard");
  }

  var colors= []
  if(typeof this._people[cid] !== "undefined"){
    colors = this._people[cid].colors;
  }
  else {
    colors = this.empirePopColors(cell.empire);
  }

  if(typeof cell.site !== "undefined"){
    colors = colors.concat(cell.site.colors);
  }
  if(typeof cell.ruin !== "undefined"){
    colors = colors.concat(cell.ruin.colors);
  }

  var colorTag= map.colorTags({cmc:1,colors:colors}).random(map.RNG);

  var select = [basic.random(map.RNG),basic.random(map.RNG),basic.random(map.RNG),basic.random(map.RNG),special.random(map.RNG),colorTag];
  select = select.random(map.RNG);

  if(cell.pop.assets.count(select)<2){
    cell.pop.assets.push(select);
  }
  else {
    if(this.RNG.random<0.15) {
      cell.pop.assets.push(select);
    }
    else {
      this.makeAssets(cell,aggro);
    }
  }
}
hexPlaneMap.prototype.newResource = function (card,cid) {
  var cell = this.cells[cid];
  var R = {
    "white":[],
    "blue":[],
    "green":[],
    "red":[],
    "black":[],
    "gray":[]
  }
}
hexPlaneMap.prototype.newSite = function (card,cell) {
  var tags = [];

  var T = {
    white:["Butte","Grassland","Orchard"],
    black:["River","Waterfalls","Geyser","Lake","Cenote"],
    green:["Forest"],
    red:["Mountain","Volcano","Mesa","Hoodoos","Canyon","Caves"],
    yellow:["Swamp","Badlands","Bog"]
  }
  T.gray = T.white.concat(T.blue,T.green,T.red,T.black);

  tags.push(T[card.colors.random(this.RNG)].random(this.RNG));

  if(card.tags.contains("creature")) {
    nature = ["Beasts","Bandits","Recluse"];
    tags.push(nature.random(this.RNG));
  }

  if(card.tags.contains("land")) {
    tags.push("Resource");
    this.cells[cell].tags.push("Resource");
  }

  if(card.tags.contains("power")) {
    tags.push("Power");
  }

  //get element/nature tags based upon color
  tags = tags.concat(this.colorTags(card));
  //make sure everything is unique
  tags = tags.unique();

  var site = {
    size:card.power,
    rarity:card.rarity,
    colors:card.colors,
    tags:tags,
  };

  //artifact chance
  if(this.RNG.random()<0.02) {
    site.artifact=[this.makeArtifact().uid];
    this.cells[cell].tags.push("Artifact");
  }

  //if there is black there is doom
  if(this.RNG.random()<0.15) {
    this.makeDoom(cell,"site");
  }

  this.cells[cell].site = site;
}
hexPlaneMap.prototype.newRuin = function (card,cell) {
  var tags = [], nature=[];
  var rarePlace = ["City","Palace","Library","Fortress","Temple","School","Tower","Tomb","Prison","Mine"];
  var places = ["City","City",rarePlace.random(this.RNG)];
  tags.push(places.random(this.RNG));

  if(card.tags.contains("artifact")) {
    nature = ["Traps","Traps","Traps","Golems"];
    tags.push(nature.random(this.RNG));
  }

  if(card.tags.contains("creature")) {
    nature = ["Remnants","Remnants","Beasts","Bandits","Villain"];
    tags.push(nature.random(this.RNG));
  }

  if(card.tags.contains("power")) {
    nature = ["Temple","School","Foundry","Lab","Wonder","Wonder","Wonder","Tower","Monastery","Library","Wonder","Wonder"];
    tags.push(nature.random(this.RNG));
  }

  if(card.tags.contains("land") || tags.contains("Mine")) {
    this.cells[cell].tags.push("Resource");
  }

  if(card.tags.contains("superhero")) {
    tags.push("Superhero");
    nature = ["","","","","Tomb","Prison","Bound","Recluse"];
    nature = nature.random(this.RNG);
    if(nature.length>0) {
      tags.push(nature)
    }
  }

  if(card.tags.contains("legendary")) {
    tags.push("Legendary");
  }

  //get element/nature tags based upon color
  tags = tags.concat(this.colorTags(card));
  //make sure everything is unique
  tags = tags.unique();

  //All ruins get a race
  var water = this.cells[cell].terrain == 0 ? true : false;
  var race = mapRaces(card.rarity,this.RNG,water);
  var ruin = {
      rarity:card.rarity,
      tags:tags,
      race: race,
      colors:card.colors,
      size:card.power
  };

  //all ruins have an artifact
  ruin.artifact=[this.makeArtifact(card).uid];
  this.cells[cell].tags.push("Artifact");

  //if there is black there is doom
  if(this.RNG.random()<0.15) {
    this.makeDoom(cell,"ruin");
  }

  this.cells[cell].ruin = ruin;
}
hexPlaneMap.prototype.assets = function () {
  var map=this, max = [0,2,4,6,8], n=0, pop={}, mpop={}, empire={}, aggro = -8, tags=[];
  //cycle through the cells
  for (var x in this.cells){
    //if there is a pop they have assets
    if(typeof this.cells[x].pop !== "undefined"){
      pop=this.cells[x].pop;
      //pull aggro for the empire or pop
      if(objExists(typeof this.cells[x].empire)) {
        aggro = this.empireAggro(this.cells[x].empire);
      }
      else {
        aggro = this._people[x].aggro;
      }
      //max asset number is n
      n = max[pop.size-1];
      //include asset array
      pop.assets = [];
      if(typeof map._people[x] !== "undefined"){
        if(map._people[x].tags.length>0) {
          pop.assets = pop.assets.concat(map._people[x].tags);
          n-= pop.assets.length;
        }
      }
      //loop while n is not 0
      while(n>0){
        //lower max asset number
        n--;
        //make the asset
        this.makeAssets(this.cells[x],aggro);
      }
    }
  }
}
hexPlaneMap.prototype.troubles = function () {
  var max = [2,3,3,4,7], n=0, i=0, tid=-1, pop={};
  //cycle through the cells
  for (var x in this.cells){
    //if there is a pop there will be toruble
    if(typeof this.cells[x].pop !== "undefined"){
      pop = this.cells[x].pop;
      //max trouble score is n
      n = max[pop.size-1];
      //this is the number of troubles in the hex
      pop.troubles = n;
    }
  }
}
hexPlaneMap.prototype.center = function () {
  return [this._width/2,this._height/2];
}
hexPlaneMap.prototype.rawcells = function () {
  var cell = [], i=0;
  for (var c in this.cells) {
    cell.push([this.cells[c].x,this.cells[c].y]);
    cell[i].data = this.cells[c]
    i++;
  }
  return cell;
}
hexPlaneMap.prototype.popData = function () {
  var data = {pop:[],sites:[],ruins:[]}, i=0, j=0, k=0, l=0;
  for (var c in this.cells) {
  	if(typeof this.cells[c].pop !== "undefined"){
  		data.pop.push([this.cells[c].x,this.cells[c].y]);
    	data.pop[i].data = this.cells[c].pop;
    	i++;
  	}

    if(typeof this.cells[c].site !== "undefined"){
  		data.sites.push([this.cells[c].x,this.cells[c].y]);
    	data.sites[l].data = this.cells[c].site;
    	l++;
  	}

    if(typeof this.cells[c].ruin !== "undefined"){
  		data.ruins.push([this.cells[c].x,this.cells[c].y]);
    	data.ruins[j].data = this.cells[c].ruin;
    	j++;
  	}
  }

  return data;
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
    newCell = "0,0";
    this.cells[newCell] = new HCell(0,0,-1);
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
hexPlaneMap.prototype.makeClimate = function (display) {
  var map = this, cA=[], done=[], cell = "";

  //put all the cells in an array for random selection
  for(var x in this.cells) {
    cA.push(x);
  }

  //Reduce artic possibilitym increase Temperate and sub tropics
  var climates = [0,1,1,2,2,2,3,3,3,4,4];

  function initialize() {
    //number of climate zones
    var nz= map.RNG.rndInt(4,12);

    for (var i = 0; i < nz; i++) {
      //for each zone find a random cell
      cell=cA.random(map.RNG);
      done.push(cell);
      //set climate of cell
      map.cells[cell].climate=climates.random(map.RNG);
      //remove the cell from the array so it can't be selected again
      cA.remove(cell);
      if(display) {
        map.displayHex(cell);
      }
    }
  }

  if(display) {
    $("#logo").hide();
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

      if(display) {
        map.displayHex(N.id);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//stats
hexPlaneMap.prototype.statTerrain = function () {
  var stat=[0,0,0,0,0];
  for(var x in this.cells){
    stat[this.cells[x].terrain]++;
  }
  return stat;
}
hexPlaneMap.prototype.statPop = function () {
  var stat={};
  for(var x in this._people){
    if(objExists(stat[this._people[x].race])){
      stat[this._people[x].race]++;
    }
    else {
      stat[this._people[x].race]=1;
    }
  }
  return stat;
}
hexPlaneMap.prototype.statEmpire = function () {
  var stat={};
  for(var x in this._empires){
    stat[this.cells[x].terrain]++;
  }
  return stat;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  this.tags=[];

  if(zone === "undefined") {
    this.zone = zone.id;
    zone.map.cells[x+","+y] = this;
    zone.cells.push(x+","+y);
  }
}
