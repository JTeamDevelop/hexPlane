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
var COLORS = ["red","green","blue","white","black"];
var HTMLCOLOR = ["AntiqueWhite","Blue","Brown","Chartreuse","Chocolate","Coral","Crimson","Cyan","DarkBlue","DarkGreen"
    ,"Orange","DarkViolet","DeepPink","Gold","Green","Indigo","DeepSkyBlue","Lime","MediumPurple","OrangeRed","Orchid"
    ,"Purple","Red","Yellow"];
var TROUBLE = [{name:"Ancient Curse",overcome:["Wealth","Ignorance"]},{name:"Angry Dead",overcome:["Military","Uprising"]}
    ,{name:"Bad Reputation",overcome:["Social","Corruption"]},{name:"Barren Surroundings",overcome:["Wealth","Poverty"]}
    ,{name:"Class Hatred",overcome:["Social","Despair"]},{name:"Conquering Heirs",overcome:["Military","Uprising"]}
    ,{name:"Contaminated Land",overcome:["Wealth","Poverty"]},{name:"Corrupt Leadership",overcome:["Social","Corruption"]}
    ,{name:"Covetous Polity",overcome:["Military","Disorder"]},{name:"Crushed Spirits",overcome:["Social","Dispair"]}
    ,{name:"Dark Wizards",overcome:["Military","Uprising"]},{name:"Demagogue",overcome:["Social","Dispair"]}
    ,{name:"Destructive Customs",overcome:["Wealth","Ignorance"]},{name:"Disputed Possession",overcome:["Military","Uprising"]}
    ,{name:"Disunity",overcome:["Social","Dispair"]},{name:"Ethnic Feuding",overcome:["Social","Dispair"]}
    ,{name:"Exceptional Poverty",overcome:["Wealth","Poverty"]},{name:"Exiled Lord",overcome:["Military","Uprising"]}
    ,{name:"Flooding",overcome:["Wealth","Poverty"]},{name:"Harsh Conditions",overcome:["Wealth","Poverty"]}
    ,{name:"Hazardous Resource",overcome:["Wealth","Ignorance"]},{name:"Raiders",overcome:["Military","Disorder"]}
    ,{name:"Inaccessible",overcome:["Wealth","Poverty"]},{name:"Mercenary Populace",overcome:["Social","Corruption"]}
    ,{name:"Monsters",overcome:["Military","Disorder"]},{name:"Murderous Heirs",overcome:["Military","Uprising"]}
    ,{name:"No Workers",overcome:["Wealth","Poverty"]},{name:"Pervasive Hunger",overcome:["Wealth","Poverty"]}
    ,{name:"Recalcitrant Locals",overcome:["Military","Disorder"]},{name:"Recurrent Sickness",overcome:["Wealth","Ignorance"]}
    ,{name:"Riotous Thugs",overcome:["Military","Disorder"]},{name:"Secret Society",overcome:["Social","Corruption"]}
    ,{name:"Severe Damage",overcome:["Wealth","Poverty"]},{name:"Sinister Cult",overcome:["Social","Corruption"]}
    ,{name:"Things From Below",overcome:["Military","Disorder"]},{name:"Doom Cult",overcome:["Social","Corruption"]}
    ,{name:"Doom Spawn",overcome:["Military","Uprising"]},{name:"Toxic Process",overcome:["Wealth","Ignorance"]}
    ,{name:"Undeveloped",overcome:["Wealth","Poverty"]},{name:"Wasted Production",overcome:["Wealth","Ignorance"]}
    ,{name:"Xenophobia",overcome:["Military","Disorder"]}
  ];

function rndCard(RNG) {


}

mapRaces = function (rarity,RNG) {
  var monstrous = ["Nightelf","Orc","Goblin","Hobgoblin","Ogre","Troll","Gnoll","Minotaur","Lizardman"];
  var smallfolk = ["Gnome","Halfling","Kobold"];
  var demi = ["Elf","Elf","Dwarf","Dwarf",smallfolk.random(RNG),monstrous.random(RNG),"Genasi","Merfolk","Naga"];
  var lycanthrope = ["Werewolf","Wereboar","Wererat","Weretiger","Werebear","Wereraven"];

  function hybrid (RNG) {
    var type = ["Ape","Badger","Bat","Bear","Beetle","Boar","Cat","Cetnipede","Crab","Crocodile","Deer","Dog","Eagle","Elephant",
        "Frog","Goat","Horse","Lion","Mantis","Octopus","Owl","Panther","Rat","Raven","Rhinoceros","Scorpion","Shark","Snake",
        "Spider","Tiger","Vulture","Wasp","Weasel","Wolf"];

    return type.random(RNG)+"-man";
  }

  function profs (RNG) {
      var type = ["Mystic Knight","Wizard","Priest","Monk"];
      return type.random(RNG);
  }

  function rareCombined(RNG) {
    var base = [demi.random(RNG),monstrous.random(RNG),hybrid(RNG)];
    return base.random(RNG)+" "+profs(RNG);
  }

  var races = {
      c:["Human",demi.random(RNG)],
      u:[demi.random(RNG),monstrous.random(RNG),hybrid(RNG),profs(RNG)],
      r:["Aboleth","Dragon","Dragon","Elementals","Giant","Golem","Treant",rareCombined(RNG),rareCombined(RNG)],
      m:["Dragon Clan","Elemental Conflux","Demigods","Kaiju"]
  };

  if(rarity=="l"){
    rarity = "u";
  }

  return races[rarity].random(RNG);
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
	var r= ["r","r","r","r","r","r","r","m"];
	var b= ["l","c","c","c","c","c","c","c","c","c","c","u","u","u",r.random(RNG)];

	return b.random(RNG);
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

  this._set={};
  this.cells = {};
  this._popTracker = {n:0};
  this._population={};
  this.zones = [];
  this._doomTracker=[];
}
hexPlaneMap.prototype.cellArray = function () {
  var cA = [];
  for (var x in this.cells) {
    cA.push(x);
  }
  return cA;
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
//doom function, gives the current doom level d, and the nature of the doom - what is its goal
hexPlaneMap.prototype.makeDoom = function (cell) {
  this._doomTracker.push(cell);
  this.cells[cell].tags.push("Doom");

  var d = [0,1,1,1,2,2,3,4];
  var t = ["Conquer","Destroy","Harvest","Subvert"];
  return [d.random(map.RNG),t.random(map.RNG)];
}
hexPlaneMap.prototype.makeArtifact = function (card) {
  card = typeof card === "undefined" ? this.newCard() : card;
  var power = {l:1.5,c:1,u:1.5,r:3,m:6};
  var artifact = {
    rarity:card.rarity,
    power:Math.round(card.cmc*power[card.rarity]),
    tags:this.colorTags(card)
  }
  return artifact;
}
hexPlaneMap.prototype.colorTags = function (card) {
  var tags = [];
  var T = {
    white:["Light","Healing","Defense","Protection","Law","Peace","Community","Equality"],
    blue:["Water","Air","Ice","Illusion","Divination","Logic","Knowledge","Trickery","Control"],
    green:["Life","Nature","Forests","Beasts","Transmutation","Strenth","Growth","Regeneration"],
    red:["Fire","Earth","Storms","Conjuration","Evocation","War","Fury","Chaos","Creativity"],
    black:["Darkness","Death","Illness","Necromancy","Corruption","Destruction","Domination","Greed"],
    gray:["Artifice","Machines","Technology","Golems"]
  }

  //push a color tag for every color
  for (var i = 0; i < card.colors.length; i++) {
    tags.push(T[card.colors[i]].random(map.RNG));
  }
  //if the size is greater than the number of colors push more tags
  var max = Math.floor(card.cmc/2);
  if(max>card.colors.length) {
    var l = max-card.colors.length, nt="";
    for (var i = 0; i < l; i++) {
      //random color random tag
      tags.push(T[card.colors.random(map.RNG)].random(map.RNG));
    }
  }
  return tags;
}
hexPlaneMap.prototype.makeAssets = function (tags,taglist,aggro) {
  var tag = tags.tags.random(this.RNG), nature = [], armyn = taglist.count("Army");

  if(COLORS.contains(tag)){
    nature=this.colorTags({cmc:1,colors:[tag]});
  }
  else if(tag == "artifact"){
    nature=["Foundry","Tech","Industry","Fortified"];
  }
  else if(tag == "creature"){
    nature = ["Militia","Population","Army","Army","Army","Army"];
  }
  else if(tag == "enchantment"){
    nature = ["Temple","School","Insdustry","Foundry","Lab"];
  }
  else if(tag == "sorcery"){
    nature = ["Tower","Monastery","Library"];
  }
  else if(tag == "instant"){
    nature = ["Temple","School","Insdustry","Foundry","Lab"];
  }
  else if(tag == "legendary"){
    nature = ["Legendary"];
  }
  else if(tag == "planeswalker"){
    nature = ["Demigod","Hero"];
  }
  else {
    nature = this.colorTags({cmc:1,colors:[tags.colors.random(this.RNG)]});
  }

  if(tag == "Army" && aggro+1 < armyn) {
    nature = this.colorTags({cmc:1,colors:[tags.colors.random(this.RNG)]});
  }

  return nature.random(this.RNG);
}
hexPlaneMap.prototype.newRace = function (card,cell) {
  var race = mapRaces(card.rarity,this.RNG), map = this;

  if(typeof this._popTracker[race] === "undefined") {
    this._popTracker[race] = 1;
  }
  else {
    this._popTracker[race]++;
  }
  this._popTracker.n++;

  var tags = [], tlist = ["types","colors","supertypes","subtypes"];
  for (var i = 0; i < tlist.length; i++) {
    if(card[tlist[i]].length>0){
      tags = tags.concat(card[tlist[i]]);
    }
  }
  tags.unique();

  var pop = {
    race: race,
    rarity:card.rarity,
    aggro:this.RNG.FateRoll(),
    tags:tags,
    colors:card.colors,
    size:card.cmc,
    pow:card.power,
    tough:card.toughness
  };

  //artifact chance
  if(this.RNG.random()<0.02) {
    pop.artifact=[this.makeArtifact()];
    this.cells[cell].tags.push("Artifact");
  }

  //if there is black there is doom
  if(card.colors.contains("black")) {
    pop.doom=this.makeDoom(cell);
  }

  this._population[cell]=pop;
  this.cells[cell].pop = {size:pop.size};

}
hexPlaneMap.prototype.newSite = function (card,cell) {
  var tags = [];

  var T = {
    white:["Butte","Grassland","Orchard"],
    blue:["River","Waterfalls","Geyser","Lake","Cenote"],
    green:["Forest"],
    red:["Mountain","Volcano","Mesa","Hoodoos","Canyon","Caves"],
    black:["Swamp","Badlands","Bog"]
  }
  T.gray = T.white.concat(T.blue,T.green,T.red,T.black);

  tags.push(T[card.colors.random(this.RNG)].random(this.RNG));

  if(card.types.contains("creature")) {
    nature = ["Beasts","Bandits","Recluse"];
    tags.push(nature.random(this.RNG));
  }

  if(card.types.contains("land")) {
    tags.push("Resource");
    this.cells[cell].tags.push("Resource");
  }

  if(card.types.contains("enchantment")) {
    tags.push("Enchantment");
  }

  if(card.types.contains("sorcery") || card.types.contains("instant")) {
    tags.push("Power");
  }

  //get element/nature tags based upon color
  tags = tags.concat(this.colorTags(card));
  //make sure everything is unique
  tags = tags.unique();

  var site = {
    size:card.cmc,
    rarity:card.rarity,
    colors:card.colors,
    tags:tags,
  };

  //artifact chance
  if(this.RNG.random()<0.02) {
    site.artifact=[this.makeArtifact()];
    this.cells[cell].tags.push("Artifact");
  }

  //if there is black there is doom
  if(card.colors.contains("black")) {
    site.doom=this.makeDoom(cell);
  }

  this.cells[cell].site = site;
}
hexPlaneMap.prototype.newRuin = function (card,cell) {
  var tags = [], nature=[];
  var rarePlace = ["City","Palace","Library","Fortress","Temple","School","Tower","Tomb","Prison","Mine"];
  var places = ["City","City",rarePlace.random(this.RNG)];
  tags.push(places.random(this.RNG));

  if(card.types.contains("artifact")) {
    nature = ["Traps","Traps","Traps","Golems"];
    tags.push(nature.random(this.RNG));
  }

  if(card.types.contains("creature")) {
    nature = ["Remnants","Remnants","Beasts","Bandits","Villain"];
    tags.push(nature.random(this.RNG));
  }

  if(card.types.contains("enchantment")) {
    nature = ["Temple","School","Foundry","Lab","Wonder","Wonder","Wonder"];
    tags.push(nature.random(this.RNG));
  }

  if(card.types.contains("sorcery") || card.types.contains("instant")) {
    nature = ["Tower","Monastery","Library","Wonder","Wonder"];
    tags.push(nature.random(this.RNG));
  }

  if(card.types.contains("land") || tags.contains("Mine")) {
    tags.push("Resource");
    this.cells[cell].tags.push("Resource");
  }

  if(card.types.contains("planeswalker")) {
    tags.push("Demigod");
    nature = ["","","","","Tomb","Prison","Bound","Recluse"];
    nature = nature.random(this.RNG);
    if(nature.length>0) {
      tags.push(nature)
    }
  }

  if(card.supertypes.contains("legendary")) {
    tags.push("Legendary");
  }

  var sub = ["angel","arcane","artificer","avatar","curse","demon","devil","dragon","druid","eldrazi","elemental","equipment","forest","giant","god","golem","illusion","legend","trap","wall","wizard"];

  //get element/nature tags based upon color
  tags = tags.concat(this.colorTags(card));
  //make sure everything is unique
  tags = tags.unique();

  //All ruins get a race
  var race = mapRaces(card.rarity,this.RNG);
  var ruin = {
      rarity:card.rarity,
      tags:tags,
      race: race,
      colors:card.colors,
      size:card.cmc
  };

  //all ruins have an artifact
  ruin.artifact=[this.makeArtifact(card)];
  this.cells[cell].tags.push("Artifact");

  //if there is black there is doom
  if(card.colors.contains("black")) {
    ruin.doom=this.makeDoom(cell);
  }

  this.cells[cell].ruin = ruin;
}
hexPlaneMap.prototype.newCard = function () {
  var r = rarity(this.RNG), card={};
  //if it is a land
  if(r=="l"){
    card.rarity = r;
    card.colors = [COLORS.random(this.RNG)];
    card.cmc = 1;
    card.types = ["land"];
  }
  else {
    card = this._set[r].random(this.RNG);
    card.rarity = r;
  }

  if(card.cmc == 0){
    card.cmc =1;
  }

  //multiply based upon rarity
  var multi = {l:1.5,c:1,u:1.5,r:3,m:6};
  card.cmc = card.cmc*multi[card.rarity];

  //if the card has no color, make it gray
  if (typeof card.colors === "undefined") {
    card.colors = ["gray"];
  }

  if (typeof card.supertypes === "undefined") {
    card.supertypes = [];
  }

  if (typeof card.subtypes === "undefined") {
    card.subtypes = [];
  }

  return card;
}
hexPlaneMap.prototype.populate = function (rpop) {
  this._set = rpop;
	var map=this, cA=this.cellArray(), cPop=[], ruins=[], cell="", r="", card ={}, tracker={l:0,c:0,u:0,r:0,m:0,a:0};

  //Load population and sites
	var n = Math.round(this._rndC/10);
	while (cPop.length < n){
    //random cell
		cell = cA.random(this.RNG);
    //no overlap of sites - must be unique cells
		if(cPop.indexOf(cell) == -1){
      cPop.push(cell);
      //pull a random card
      card = this.newCard();
      //if it isn't a land
			if(card.rarity!="l"){
        //test if the card is a creature
        if(card.types.indexOf("creature")>-1) {
          if(map.RNG.random() <0.8) {
            this.newRace(card,cell);
          }
          else {
            this.newSite(card,cell);
          }
        }
        else {
          //otherwise 50/50 chance of a race
          if(map.RNG.TrueFalse()){
            this.newRace(card,cell);
          }
          else {
            this.newSite(card,cell);
          }
        }
			}
      else {
        this.newSite(card,cell);
      }
			tracker[card.rarity]++;
      if(card.types.contains("artifact")) {
        tracker.a++;
      }
		}
	}

  //Ruins
  var n = Math.round(this._rndC/100);
  while (ruins.length < n){
    cell = cA.random(this.RNG);
    if(ruins.indexOf(cell) == -1){
      ruins.push(cell);
      //load a random card
      card = this.newCard();
      this.newRuin(card,cell);
      tracker[card.rarity]++;
      if(card.types.contains("artifact")) {
        tracker.a++;
      }
    }
  }

	console.log(tracker);
  console.log(this._popTracker);
	this.empires();
  this.troubles();
  this.assets();
  this.popDisplay();
  delete this._set;
}
hexPlaneMap.prototype.empireTags = function (eid) {
  var empire = this.empires[eid], tags=[], colors=[];
  for (var i = 0; i < empire.cells.length; i++) {
    if(typeof this._population[empire.cells[i]] !== "undefined"){
      tags = tags.concat(this._population[empire.cells[i]].tags);
      colors = colors.concat(this._population[empire.cells[i]].colors);
    }
    if(typeof this.cells[empire.cells[i]].site !== "undefined"){
      tags = tags.concat(this.cells[empire.cells[i]].site.tags);
      colors = colors.concat(this.cells[empire.cells[i]].site.colors);
    }
  }
  tags.unique();
  colors.unique();
  return {tags:tags,colors:colors};
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
hexPlaneMap.prototype.assets = function () {
  var map=this, max = [1,4,7,10,13], n=0, pop={}, empire={}, aggro = -8, tags=[];
  //cycle through the cells
  for (var x in this.cells){
    //if there is a pop they have assets
    if(typeof this.cells[x].pop !== "undefined"){
      pop = this.cells[x].pop;
      //pull tags for the entire empire
      if(typeof this.cells[x].empire !== "undefined") {
        tags = this.empireTags(this.cells[x].empire);
        aggro = this.empireAggro(this.cells[x].empire);
      }
      else {
        tags = {tags:this._population[x].tags,colors:this._population[x].colors};
        aggro = this._population[x].aggro;
      }
      //max asset number is n
      n = max[pop.size-1];
      //include asset array
      pop.assets = [];
      //loop while n is not 0
      while(n>0){
        //lower max asset number
        n--;
        //push the asset
        pop.assets.push(this.makeAssets(tags,pop.assets,aggro));
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
      //include trouble array
      pop.troubles = [];
      //loop while n is not 0
      while(n>0){
        //initial trouble strength is always 1 but maybe two if n>1
        i=1;
        if(n>1){
          i = this.RNG.rndInt(1,2);
        }
        //lower max trouble score
        n-=i;
        //get random trouble - just the id to keep data low
        tid = this.RNG.rndInt(0,TROUBLE.length-1);
        //push the trouble with strength
        pop.troubles.push([tid,i]);
      }
    }
  }
}
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

  function initialize() {
    var ap=0, power=0, color="";
    for (var i = 0; i < major.length; i++) {
      cid=major[i];
      pop=map._population[cid];
      //assign power
      power=pop.size-4
      //assign a color
      color = hcolor.random(map.RNG);
      //load basic empire data
      empires[cid]={color:color,power:power,cells:[cid]};
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
        if(map.RNG.random()<0.8) {
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

  map.empires = empires;
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
  var data = {pop:[],sites:[],ruins:[],empires:[]}, i=0, j=0, k=0, l=0;
  for (var c in this.cells) {
  	if(typeof this.cells[c].pop !== "undefined" && typeof this.cells[c].empire === "undefined"){
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

    if(typeof this.cells[c].empire !== "undefined"){
  		data.empires.push([this.cells[c].x,this.cells[c].y]);
    	data.empires[k].data = this.cells[c].empire;
    	k++;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Display

hexPlaneMap.prototype.key = function () {

    var title = "<h2>Key</h2>", tkey="<div id=keyTerrain>", ckey="<div id=keyClimate>";
    TERRAIN.forEach(function(T){
    	tkey+="<div class=square style='background:"+T.color+"'></div>"+T.name+"</br>";
    })
	CLIMATE.forEach(function(C){
    	ckey+="<div class=square style='background:"+C.color+"'></div>"+C.name+"</br>";
    })
    tkey+="</div>";
    ckey+="</div>";

    d3.select("#hexKey").append("div")
      .attr("id", "TCKey")
      .html(title+tkey+ckey);

    d3.select("#hexKey").append("div")
      .attr("id", "cellInfo");

}

hexPlaneMap.prototype.display = function () {
  var map = this;
  var svg = d3.select("#hexPlane").append("svg")
  	.classed({'map': true})
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
      map.cellDisplay(hex[0]+","+hex[1]);
    });

	var hexClimate = svg.append("g").classed({'gClimate': true})
    .selectAll("path")
    .data(map.rawcells(), function(cell){
      return drawCell(map,cell);
    })
    .enter().append("path")
    .classed({'hex': true})
    .style({fill: function (cell) {
        if(cell.data.climate>-1) {
          return CLIMATE[cell.data.climate].color;
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
      map.cellDisplay(hex[0]+","+hex[1]);
    });

    var hinfo = "<h1>"+this.name+"</h1>";
    hinfo+="<strong>Seed: </strong>"+this.uid;
    hinfo+="<h3>Views</h3><span class=selView id=gClimate>Climate</span>";
    hinfo+="</br><span class='selView selected' id=gPop>Population</span>";
    hinfo+="</br><span class='selView selected' id=gEmpires>Empires</span>";
    hinfo+="</br><span class='selView selected' id=gSites>Sites</span>";
    hinfo+="</br><span class='selView selected' id=gRuins>Ruins</span>";

    d3.select("#hexKey").append("div")
      .attr("id", "pInfo")
      .html(hinfo);

	//add functionality to change views
	d3.selectAll(".selView").on("click",function(){
		var sel = d3.select(this);
		var state = sel.classed("selected"), opacity=1;
    if(state) {
      opacity = 0;
    }
		var id = sel.attr("id");
		//togles the climate views on and off
		if(id == "gClimate"){
			if(state) {
				d3.select(".gHex").style({opacity:1});
				d3.select("#keyTerrain").style({display:"inline"});
				d3.select("#keyClimate").style({display:"none"});
			}
			else {
				d3.select(".gHex").style({opacity:0});
				d3.select("#keyTerrain").style({display:"none"});
				d3.select("#keyClimate").style({display:"inline"});
			}
		}

    //toggle dots on and off
    d3.select("."+id).style({opacity:opacity});

		//toggle selected class
		sel.classed("selected", !sel.classed("selected"));
	});

	map.key();
}
hexPlaneMap.prototype.makePoints = function (groupclass,cellclass,data,size,color) {
  var svg = d3.select(".map"), map=this;

  var pop = svg.append("g").attr("class",groupclass)
    .selectAll("circle")
    .data(data, function(cdata){
      return cellCenter(map,cdata);
    })
    .enter().append("circle")
    .attr("class",cellclass)
    .attr("cx", function(cdata){
      return cellCenter(map,cdata)[0];
    })
    .attr("cy", function(cdata){
      return cellCenter(map,cdata)[1];
    })
    .attr("r", function(cdata){ return size(cdata); })
    .style({fill: function(cdata){ return color(cdata); }})
    .order()
    .on("click", function(){
        var cdata = d3.select(this).datum();
        console.log(cdata);
    });
}
hexPlaneMap.prototype.cellDisplay = function (cell) {
  var data = this.cells[cell];
  var html="<h3>Cell "+cell+"</h3>";
  html+="<strong>"+TERRAIN[data.terrain].name+" ("+CLIMATE[data.climate].name+")</strong>";

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

  if(typeof data.pop !== "undefined" && typeof data.empire === "undefined"){
    var pop = map._population[data.x+","+data.y];
    html+="</br>"+pop.race+" "+sizes[data.pop.size-1];
  }

  if(typeof data.empire !== "undefined"){
    var empire = data.empire;
    html+="</br>Empire "+sizes[data.pop.size-1];
  }

  if(typeof data.site !== "undefined"){
    var site = data.site;
    html+="</br>"+site.tags[0]
    html+="</br>"+site.tags[1]
  }

  if(typeof data.ruin !== "undefined"){
    var ruin = data.ruin;
    html+="</br><strong>"+ruin.race+" Ruin</strong>";
    html+="</br>"+ruin.tags[0]+" ("+ruin.size+")";
  }

  html+="</br>"+data.tags.join(" ,");

  d3.select("#cellInfo").html(html);
}
hexPlaneMap.prototype.popDisplay = function () {
	var svg = d3.select(".map"), map=this, popdata = map.popData();

  this.makePoints('gPop','pop',popdata.pop,function () { return 3; },function () { return 'red'; });
  this.makePoints('gSites','site',popdata.sites,function () { return 3; },function () { return 'Gold'; });
  this.makePoints('gRuins','ruin',popdata.ruins,function () { return 3; },function () { return 'gray'; });
  this.makePoints('gEmpires','empire',popdata.empires,function () { return 3; },function (empire) { return map.empires[empire.data].color; });

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

	$('path.hex').tooltipsy({
		content: function(cell) {
			var data = cell[0].__data__.data;
			var html="<strong>"+TERRAIN[data.terrain].name+" ("+CLIMATE[data.climate].name+")</strong>";

			if(typeof data.pop !== "undefined" && typeof data.empire === "undefined"){
				var pop = map._population[data.x+","+data.y];
        html+="</br>"+pop.race+" "+sizes[data.pop.size-1];
			}

      if(typeof data.empire !== "undefined"){
				var empire = data.empire;
        html+="</br>Empire "+sizes[data.pop.size-1];
			}

      if(typeof data.site !== "undefined"){
        var site = data.site;
        html+="</br>"+site.tags[0]
        html+="</br>"+site.tags[1]
      }

      if(typeof data.ruin !== "undefined"){
        var ruin = data.ruin;
        html+="</br><strong>"+ruin.race+" Ruin</strong>";
        html+="</br>"+ruin.tags[0]+" ("+ruin.size+")";
      }

      html+="</br>"+data.tags.join(" ,");

			return html;
		}
	});

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

var map = new hexPlaneMap();
map.random();
console.log(map);
map.display();
