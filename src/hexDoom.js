DOOMS = ["Aboleth","Beholder","Dragon","Giant","Wizard","False god","Elemental","Kaiju","Phase Spider","Thought Lords","Lich","Sect"];
TROUBLE = [
    {name:"Bad Reputation",
      text: "From everything you heard the people of this region are just a step above bandits - a small step. ",
      options:[
        {text:"But from your limited exploretion you haven't expereinced that. It seems like it is a matter of an age old grudge.",
        overcome:[]},
        {text:"And it is just as bad as you've heard.",
        overcome:[]}
      ],
      overcome:["Influence","Leadership"]},
    {name:"Barren Surroundings",
      text:"The land is suffering. Perhaps crops and resources were abundant here once, but those times are only memories. "
        +"The locals need your help.",
      options:[["Offer to help dig wells and irrigation ditches.",["Mighty","Physique","Super-strength","Earth Control","Water Control"]],
        ["In your travels you've seen crops growing in similar situations. Maybe one of them will do well here.",["Clever","Plant Control"]],
        ["Crops are failing, but the land can still provide. You know of a number of trades that the locals can learn to make a living.",["Clever","Knowledge"]],
        ["Help design and oversee the construction of a dam.",["Wise","Leadership","Technical"]]],
      overcome:["Physique","Technical","Knowledge","Leadership"]},
    {name:"Class Hatred",
      text:"Major factions in the region detest each other.",
      options:["",[]],
      overcome:["Empathy","Influence"]},
    {name:"Conquering Heirs",overcome:["Melee Combat","Ranged Combat","Arcana"]},
    {name:"Contaminated Land",overcome:["Physique","Technical","Knowledge","Leadership"]},
    {name:"Corrupt Leadership",overcome:["Investigate","Influence"]},
    {name:"Covetous Polity",overcome:["Leadership","Investigate"]},
    {name:"Crushed Spirits",overcome:["Empathy","Leadership"]},
    {name:"Demagogue",overcome:["Influence","Will","Deceive"]},
    {name:"Destructive Customs",overcome:["Influence","Knowledge"]},
    {name:"Disputed Possession",overcome:["Leadership"]},
    {name:"Disunity",overcome:["Influence"]},
    {name:"Ethnic Feuding",overcome:["Influence","Knowledge"]},
    {name:"Exceptional Poverty",overcome:["Influence","Knowledge"]},
    {name:"Exiled Lord",overcome:["Influence","Knowledge"]},
    {name:"Flooding",overcome:["Influence","Knowledge"]},
    {name:"Harsh Conditions",overcome:["Influence","Knowledge"]},
    {name:"Hazardous Resource",overcome:["Influence","Knowledge"]},
    {name:"Inaccessible",overcome:["Influence","Knowledge"]},
    {name:"Mercenary Populace",overcome:["Influence","Knowledge"]},
    {name:"Murderous Heirs",overcome:["Influence","Knowledge"]},
    {name:"No Workers",overcome:["Influence","Knowledge"]},
    {name:"Pervasive Hunger",overcome:["Influence","Knowledge"]},
    {name:"Recalcitrant Locals",overcome:["Influence","Knowledge"]},
    {name:"Recurrent Sickness",overcome:["Influence","Knowledge"]},
    {name:"Riotous Thugs",overcome:["Influence","Knowledge"]},
    {name:"Secret Society",overcome:["Influence","Knowledge"]},
    {name:"Severe Damage",overcome:["Influence","Knowledge"]},
    {name:"Sinister Cult",overcome:["Influence","Knowledge"]},
    {name:"Doom Cult",overcome:["Influence","Knowledge"]},
    {name:"Toxic Process",overcome:["Influence","Knowledge"]},
    {name:"Undeveloped",overcome:["Influence","Knowledge"]},
    {name:"Wasted Production",overcome:["Influence","Knowledge"]},
    {name:"Xenophobia",overcome:["Influence","Knowledge"]}
  ];
var TROUBLEOVERCOME = {
  "Ignorance":["Clever","Subtle","Wise"],
  "Poverty":["Clever","Mighty","Wise"],
  "Disorder":["Bold","Mighty","Quick"],
  "Uprising":["Bold","Mighty","Quick"],
  "Dispair":["Quick","Subtle","Wise"],
  "Corruption":["Bold","Clever","Subtle"]
};
FOETYPES = {
  Biter: {id:"Biter",HD:1,armor:0,dmg:"1d3"},
  Rabble: {id:"Rabble",HD:1,armor:0,dmg:"1d4"},
  Thug: {id:"Thug",HD:1,armor:0,dmg:"1d6"},
  Soldier: {id:"Soldier",HD:1,armor:1,dmg:"1d6"},
  Veteran: {id:"Veteran",HD:2,armor:2,dmg:"1d8"},
  Brute: {id:"Brute",HD:"T+2",armor:1,dmg:"1d10"},
  Sorcerer: {id:"Sorcerer",HD:"T",armor:0,dmg:"1d4"},
  Tank: {id:"Tank",HD:"T+1",armor:3,dmg:"1d8"},
  Swarm: {id:"Swarm",HD:"T*2",armor:0,dmg:"1d6"},
  Slayer: {id:"Slayer",HD:"T+3",armor:2,dmg:"1d10+2"},
  Solitary: {id:"Solitary",HD:"T",armor:0,dmg:"1d10"},
  Group: {id:"Group",HD:"T*2/3",armor:0,dmg:"1d8"},
  Horde: {id:"Horde",HD:1,armor:0,dmg:"1d6"},
}
COLORDESCRIPTOR = {
	"green":["Wind","Gale","Storm","Dire","Thorny","Proto","Emerald","Moss","Malachite","Veridian"],
	"red":["Inferno","Flame","Blaze","Pyre","Desert","War","Strife","Ravage","Crimson","Scarlet","Ruby"],
	"yellow":["Stone","Cunning","Crystal","Rock","Crag","Doom","Death","Ruin","Null","Amber","Gold","Citrine","Aurulent"],
	"white":["Iron","Glory","Law","Protection","Void","Righteousness","Strength","Pale","Ashen","Ghost","Silver","Alabaster","Ivory","Ghastly","Hoary","Pallid"],
	"black":["Devious","Night","Shadow","Fear","Ice","Snow","Blizzard","Azure","Cobalt","Sapphire"]
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.foe = function (map,cid,hid) {
  var seed = map.uid+"@"+cid+"&"+map._time+"_F",
    cRNG = new RNG(seed),
    rarity = cRNG.rarity(),
    cell = map.cells[cid],
    water = cell.terrain == 0 ? true : false;
    hero = cpxActive.heroes[hid],
    hL = hero.levels.length,
    T = cRNG.rndInt(1,4)-cRNG.rndInt(1,4)+hL,
    people = {}, name="", foes=[],
    nature = ["bandit","beast","doom"],
    minions = ["Biter","Rabble","Thug","Soldier"],
    elite = ["Veteran","Brute","Sorcerer","Tank","Swarm"];

  if( T < 1){
      T = 1;
  }

  //Bandit, Thug, Goon, Marauder, Pirate, Raider, Merc, Cutthroat, Ruffian, Bruiser, Tough
  //Warrior, Champion, Fighter, Soldier, Trooper, Knight, Legionnaire, Barbarian, Berserker,
  var banditNames = {
    Minion:["Bandit", "Thug","Warrior", "Goon", "Marauder", "Pirate", "Raider", "Mercinary", "Cutthroat", "Ruffian", "Bruiser"],
    Brute: ["Barbarian", "Berserker","Brute"],
    Tank:["Soldier", "Trooper", "Knight", "Legionnaire"],
    Sorcerer:["Sorcerer","Conjurer","Necromancer","Shaman","Wizard","Warlock"]
  }

  var foeTypes = {
    Biter: {id:"Biter",HD:1,armor:0,dmg:"1d3"},
    Rabble: {id:"Rabble",HD:1,armor:0,dmg:"1d4"},
    Thug: {id:"Thug",HD:1,armor:0,dmg:"1d6"},
    Soldier: {id:"Soldier",HD:1,armor:1,dmg:"1d6"},
    Veteran: {id:"Veteran",HD:2,armor:2,dmg:"1d8"},
    Brute: {id:"Brute",HD:T+2,armor:1,dmg:"1d10"},
    Sorcerer: {id:"Sorcerer",HD:T,armor:0,dmg:"1d4"},
    Tank: {id:"Tank",HD:T+1,armor:3,dmg:"1d8"},
    Swarm: {id:"Swarm",HD:T*2,armor:0,dmg:"1d6"},
    Slayer: {id:"Slayer",HD:T+3,armor:2,dmg:"1d10+2"}
  }

  var eHD = [2,T+2,T,T+1,T*2];

  function Biters(){
    var cT = cRNG.rndInt(1,6);
    for (var i = 0; i < cT; i++) {
      foes.push("Biter");
    }
  }

  function minionMix(){
    var r = cRNG.rndInt(1,3), cT = cRNG.rndInt(1,4)+T;
    if(r==1){
      for (var i = 0; i < cT; i++) {
        foes.push("Rabble");
      }
      foes.push("Veteran");
    }
    else if (r==2){
      for (var i = 0; i < cT; i++) {
        foes.push("Soldier");
      }
    }
    else {
      for (var i = 0; i < cT; i++) {
        foes.push("Thug");
      }
      if(cRNG.TrueFalse()){
        foes.push("Veteran");
      }
    }
  }

  function eliteMix() {
    var r = cRNG.rndInt(1,4), cT = cRNG.rndInt(1,4)+T;
    if(r==1){
      cT = cRNG.rndInt(1,6)+T;
      for (var i = 0; i < cT; i++) {
        foes.push("Biter");
      }
      foes.push("Sorcerer");
    }
    else if (r==2){
      for (var i = 0; i < cT; i++) {
        foes.push("Thug");
      }
      foes.push("Brute");
    }
    else if (r == 3){
      for (var i = 0; i < cT; i++) {
        foes.push("Soldier");
      }
      foes.push("Tank");
    }
    else {
      foes.push("Swarm");
    }
  }

  function eliteMax (){
    var r=cRNG.rndInt(1,4), cT = cRNG.rndInt(1,4)+T,
      mElite = ["Brute","Sorcerer","Tank"], minion = minions.random(cRNG);

    if(r==1){
      foes.push("Swarm");
      foes.push("Swarm");
    }
    else {
      foes.push(mElite.random(cRNG));
      foes.push(mElite.random(cRNG));
      for (var i = 0; i < cT; i++) {
        foes.push(minion);
      }
    }
  }

  function Boss () {
    if(cRNG.TrueFalse()){
      foes = minionMix().concat(minionMix());
    }
    else {
      foes = eliteMix();
    }
    foes.push("Boss");
  }

  nature = nature.random(cRNG);

  if(nature == "bandit"){
    var water = cell.terrain == 0 ? true : false;
    people.race = mapRaces(cRNG.rarity(),cRNG,water);

    if(objExists(cell.pop)){
      if(cRNG.TrueFalse()){
        people = map.empirePeople(cell.pop.eid).random(cRNG);
      }
    }
  }
  else if (nature == "doom") {
    people.race = DOOMS.random(cRNG);
  }

  if(nature == "bandit" || nature == "doom") {
    var foeparty = [Biters,Biters,minionMix,minionMix,minionMix,minionMix,eliteMix,
      eliteMix,eliteMix,eliteMix,eliteMix,eliteMix,eliteMax,eliteMax,eliteMax,Boss];
    foeparty[cRNG.multiRoll(1,6,3)-3]();

    var eliteList = ["Brute","Sorcerer","Tank"];
    for (var i = 0; i < foes.length; i++) {
      if(eliteList.contains(foes[i])){
        name = banditNames[foes[i]].random(cRNG);
      }
      else if (foes[i]=="Boss") {
        name = banditNames[eliteList.random(cRNG)].random(cRNG);
      }
      else if (foes[i]=="Swarm") {
        name = banditNames.Minion.random(cRNG)+" Mob";
      }
      else {
        name = banditNames.Minion.random(cRNG);
      }

      foes[i] = foeTypes[foes[i]];
      foes[i].hp = cRNG.multiRoll(1,8,foes[i].HD);
      foes[i].name = people.race + " " + name;
    }
  }
  else {
    foes = CPX.beast(water);
  }

  return foes;
}
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.bandit = function (empire) {

}
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.beast = function (water) {
  function Size() {
    var sizes = ["Tiny","Small","Small","Standard","Standard","Standard","Standard",
      "Standard","Standard","Large","Large","Huge"];
    size = sizes.random(cRNG);
    if (size == "Tiny") {
      range.push("hand");
      damage[1]-=2;
    }
    else if (size == "Small") {
      range.push("close");
    }
    else if (size == "Standard") {
      range.push("close");
    }
    else if (size == "Large") {
      range.push("close","reach");
      hp+=4;
      damage[1]+=1;
    }
    else if (size == "Huge") {
      range.push("reach");
      hp+=8;
      damage[1]+=3;
    }
  }

  function noApp() {
    var na = ["Solitary","Group","Solitary","Group","Horde"];
    noapp = na.random(cRNG)

    if(noapp == "Solitary"){
      hp = 12;
      damage = [10,0];
      N=1;
    }
    else if(noapp == "Group"){
      hp = 6;
      damage = [8,0];
      N=cRNG.rndInt(1,6)+2;
    }
    else {
      hp = 3;
      damage = [6,0];
      N=cRNG.multiRoll(1,6,3);
    }
  }

  function beastNature() {
    var basic = ["tick","slug","worm","ant","cetipede","scorpion","snake","lizard","rat","boar","hound","wolf",
      "lion","panther","ape","toad","raptor"];
    var airborn = ["mosquito","locust","dragonfly","moth","bee","wasp","crane","herron","jay","gull","raven","falcon","eagle","owl","condor","pteranodon"];
    var nwater = ["jelly","clam","eel","snake","frog","sailfish","snapper","crab","turtle","aligator","shark","squid","octopus"];
    if(size== "Large"){
      basic.push("horse","ox","buffalo","bear");
    }
    else if(size== "Huge"){
      basic.push("elephant","allosaurus");
      nwater.push("whale");
    }

    if(water){
      nature = nwater.random(cRNG);
    }
    else {
      nature = basic.concat(basic,airborn);
      nature = nature.random(cRNG);
    }
  }

  function Descriptor () {
    name = COLORDESCRIPTOR[colors.random(cRNG)].random(cRNG).capFirst();
  }

  var cRNG = xorRNG, rarity = cRNG.rarity(), colors = cRNG.fiveColor(),
    name="", nature="", noapp="", N=0, size="", hp = 0, damage = "", range=[], armor=0, tags=[], piercing=0;
  var rndArmor = [0,0,0,1,1,1,1,2];
  armor = rndArmor.random(cRNG);
  noApp();
  Size();
  Descriptor();
  beastNature();

  var group = [], dmg="";
  name += " "+nature.capFirst();
  if(size !="Standard"){
    name = size.capFirst()+" "+name;
  }

  for (var i = 0; i < N; i++) {
    dmg="1d"+damage[0]+"+"+damage[1];
    group.push({id:nature,name:name,hp:hp,armor:armor,size:size,dmg:dmg});
  }

  return group;

  var special = ["Amorphous","Cautious","Construct","Devious","Intelligent","Magical","Organized","Planar","Stealthy","Terrifying",
    "Armored","Nimble","Winged","Strength","Dangerous","Deadly","Hardy","Trickery","Vicious",
    "Air","Earth","Fire","Water","Life","Death","Strength","Trickery","Time","Knowledge","Nature","Community","Charm","War",
    "Lies","Dischord","Peace","Truth","Balance","Hate","Envy","Love",
    "Bless","Curse","Blast","Entangle","Poison","Disease","Paralyze","Petrify","Mimic","Camouflage","Hypnotize","Acid","Disintegrate",
    "Drain Life","Drain Magic","Immunity(Element)","Read Minds","Control Minds",
    "Divination","Enchantment","Evocation","Illusion","Necromancy","Summoning",
    "Hydra-","Headless","Many-limbed","Many-tailed","Tentacled"
  ];
  if(tags.contains("Strength")){
    damage+="+2";
    tags.push("Forceful");
  }
  if(tags.contains("Armored")){
    armor+=1;
  }
  if(tags.contains("Deadly")){
    piercing+=1;
  }
  if(tags.contains("Hardy")){
    hp+=4;
  }
  if(tags.contains("Tricky")){
    tags.push("Stealthy");
  }
  if(tags.contains("Vicious")){
    damage+="+2";
  }

}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
CPX.doomInitial = function (rid,cRNG) {
  var map = cpxActive.realms[rid],
    max = [2,3,3,4,5], n=0, i=0, tid=-1, pop={}, doom = {}, dRNG={};
  //cycle through the cells
  for (var x in map.cells){
    //if there is a pop there will be trouble
    if(objExists(map.cells[x].pop)){
      pop = map.cells[x].pop;
      //max trouble score is n
      n = max[Math.floor(pop.size-1)];
      //this is the number of troubles in the hex
      map.cells[x].pop.troubles = n;
    }

    //set the doom - chance is only 5% per cell
    if(cRNG.random()<0.035){
      dRNG= new RNG(rid+"@"+x+"_D");
      doom = {c:1,u:2,r:cRNG.rndInt(3,4),m:5};
      map.cells[x].doom= doom[dRNG.rarity()];
      map._doom[x] = {cells:[x]}
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//doom function, gives the current doom level d, and the nature of the doom - what is its goal
hexPlaneMap.prototype.makeDoom = function (cell,location) {
  this.cells[cell].tags.push("Doom");
  var agenda = ["Conquer","Destroy","Subvert","Amass"];
  var uid = makeUID(6,this.RNG);
  this._doom[uid] = {agenda:agenda.random(this.RNG),cell:cell,cradle:location};
}
hexPlaneMap.prototype.doomCheckWithin = function (cid) {
}
hexPlaneMap.prototype.doomArray = function () {
  var dA = [];
  for (var x in this._doom){
    dA.push(x);
  }
  return dA;
}
hexPlaneMap.prototype.doomSelect = function () {
  var Doom = this._doom[this.doomArray().random(this.RNG)];

  var armies = ["Horde","Organization","Scourge","Titan"];
  Doom.armies = [armies.random(this.RNG)];

  //sieze a Power, Destroy a community
  var plans = [{stage:0,nature:"power"},{stage:0,nature:"destroy"}];

}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.displayEncounter = function () {
  var map = this, foes = this._currentEncounter;
  $("#notify").removeClass("slim");
  $("#notify").addClass("wide");
  $("#notify .content").empty();

  var html = "<div id=attacked><h3>Attack!</h3><p>You have been attacked!</p>";
  if(foes.length>5){
    html += "<div class='threeColumn inline content'>";
    for (var i = 0; i < Math.floor(foes.length/2); i++) {
      html+= "<div class=foe data-i='"+i+"'>"+foes[i].name+"</div>";
    }
    html += "</div><div class='threeColumn inline content'>";
    for (i = Math.ceil(foes.length/2); i < foes.length; i++) {
      html+= "<div class=foe data-i='"+i+"'>"+foes[i].name+"</div>";
    }
    html+="</div>";
  }
  else {
    html += "<div class='threeColumn inline content'>";
    for (var i = 0; i < foes.length; i++) {
      html+= "<div class=foe data-i='"+i+"'>"+foes[i].name+"</div>";
    }
    html+="</div>";
  }

  html+="<div id='attackOptions' class='threeColumn inline content'><div class='buttons center'>";
  hero.attackActions.forEach(function (aO) {
    html+="<button data-action='"+aO+"'>"+aO+"</button></br>";
  })
  html+="</div></div></div>";

  d3.select("#notify .content").html(html);
  $("#notify").slideDown();

  d3.selectAll("#attackOptions button").on("click", function(){
    $("#attackOptions button").removeClass("selected");
    $(this).addClass("selected");
    var action = $(this).attr("data-action");

    if(action == "Flee"){
      CPX.heroFlee(map);
    }

  });

  d3.selectAll(".foe").on("click", function(){
    var id = $(this).attr("data-i");
    var action = $("#attackOptions .selected").attr("data-action");
    if(action == "Fight"){
      CPX.heroFight(map,id);
    }
  });

}
