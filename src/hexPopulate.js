/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
mapRaces = function (rarity,cRNG,water) {
  var monstrous = ["Nightelf","Orc","Goblin","Hobgoblin","Ogre","Troll","Gnoll",
    "Minotaur","Lizard-people","Snake-people","Dog-people","Cat-people","Mantis-people","Naga"];
  var smallfolk = ["Gnome","Halfling","Kobold"];
  var demi = ["Elf","Elf","Dwarf","Dwarf",smallfolk.random(cRNG),monstrous.random(cRNG),"Genasi"];
  var lycanthrope = ["Werewolf","Wereboar","Wererat","Weretiger","Werebear","Wereraven"];

  function hybrid () {
    var type = ["Ape","Badger","Bat","Bear","Beetle","Boar","Cat","Cetnipede","Crab","Crocodile","Deer","Dog","Eagle","Elephant",
        "Frog","Goat","Horse","Lion","Mantis","Owl","Panther","Rat","Raven","Rhinoceros","Scorpion","Snake",
        "Spider","Tiger","Vulture","Wasp","Weasel","Wolf"];

    return type.random(cRNG)+"-people";
  }

  function profs (base) {
    var type = ["Mystic Knight","Wizard","Priest","Monk"];
    return base.random(cRNG)+" "+type.random(cRNG);
  }

  var waterRaces = {
    c:["Merman","Sea-elf","Sahaugain"],
    u:["Octopus-people","Shark-people","Eel-people","Crab-people","Naga"],
    r:["Dragon","Dragon","Elementals","Elementals","Giant","Golem"],
    m:[]
  }

  var races = {
    c:["Human",demi.random(cRNG)],
    u:[demi.random(cRNG),monstrous.random(),hybrid(),profs(["Human",demi.random(cRNG)])],
    r:["Dragon","Dragon","Elementals","Elementals","Giant","Golem","Treant",profs([demi.random(cRNG),monstrous.random(cRNG),hybrid(cRNG)]),profs([demi.random(cRNG),monstrous.random(cRNG),hybrid(cRNG)])],
    m:["Dragon Clan","Elemental Conflux","Demigods"]
  }
  if(water){
    races.c=waterRaces.c;
    races.u=waterRaces.u;
    races.r=waterRaces.r;
    races.u.push(profs(races.c));
    races.r.push(profs(races.u),profs(races.u));
  }

  if(rarity=="l"){
    rarity = "u";
  }

  return races[rarity].random(cRNG);
}
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Functions to populate the hexPlane

//Actually populates map - creates cultures, sites and ruins based upon the number of hexes
hexPlaneMap.prototype.populate = function () {
	var map=this, cA=this.cellArray(), cPop=[], ruins=[], cell="", r="", card ={}, track={r:0,s:0};

  //Load population and sites
	var n = Math.round(this._rndC/10);
  while(cPop.length <n)  {
    //random cell
    cell = cA.random(this.RNG);
    if(cPop.contains(cell)){
      continue;
    }
    cPop.push(cell);
    //pull a random card
    card = newCard(this.RNG);
    //if it isn't a land
    if(card.rarity!="l"){
      //test if the card is a creature
      if(card.tags.contains("creature")) {
        if(map.RNG.random() <0.8) {
          this.newRace(card,cell);
          track.r++;
        }
        else {
          this.newSite(card,cell);
          track.s++;
        }
      }
      else {
        //otherwise 50/50 chance of a race
        if(map.RNG.TrueFalse()){
          this.newRace(card,cell);
          track.r++;
        }
        else {
          this.newSite(card,cell);
          track.s++;
        }
      }
    }
    else {
      this.newSite(card,cell);
      track.s++;
    }
  }
  console.log(track);

  //Ruins
  var n = Math.round(this._rndC/100);
  while (ruins.length < n){
    cell = cA.random(this.RNG);
    if(ruins.indexOf(cell) == -1){
      ruins.push(cell);
      //load a random card
      card = newCard(this.RNG);
      this.newRuin(card,cell);
    }
  }

  this.troubles();
//  this.assets();
  this.popDisplay();
  delete this._set;
}
///////////////////////////////////////////////////////////////////////////////////
//Adds races
hexPlaneMap.prototype.newRace = function (card,cid) {
  cid = typeof cid === "undefined" ? this.noPopCell() : cid;
  var map = this, cell = map.cells[cid];
  var water = cell.terrain == 0 ? true : false;
  var race = mapRaces(card.rarity,this.RNG,water);

  var tags=[];
  if(card.tags.contains("power")) {
    tags.push(this.colorTags(card).random(this.RNG));
  }

  if(card.tags.contains("legendary") || card.tags.contains("superhero")) {
    tags.push("Superhero");
  }

  if(card.tags.contains("land")) {
    this.cells[cid].tags.push("Resource");
  }

  var stats = [[1,1,0,0,-1,-1],[2,1,0,0,-1,-2]];

  var pop = {
    race: race,
    rarity:card.rarity,
    aggro:map.RNG.FateRoll(),
    tags:tags,
    colors:card.colors,
    size:card.power,
    name:map.RNG.rndName(),
    stats:map.RNG.shuffleAr(stats.random(map.RNG)),
    hexcolor:map.RNG.rndColor()
  };

  //artifact chance
  if(this.RNG.random()<0.02) {
    pop.artifact=[this.makeArtifact().uid];
    cell.tags.push("Artifact");
  }

  //if there is black there is doom
  if(this.RNG.random()<0.15) {
    if(pop.aggro==0) {
      pop.aggro++;
    }
    pop.aggro=Math.abs(pop.aggro);
    this.makeDoom(cid,pop.name);
  }

  var empire = {}, eid = "", ap = [3,3,3,3,3], ns=-1, eid="";
  //if the cell has a pop it is already claimed - add new race to empire
  if(objExists(cell.pop)){
    //push the race to the cell pop - only cells with new races have a pop.pop
    if(objExists(cell.pop.pop)){
      cell.pop.pop.push(pop.name);
    }
    else {
      cell.pop.pop = [pop.name];
    }
    //empire id of the cell
    eid = cell.pop.eid;
    //empire
    empire = map._empires[eid];
    //push the pop to the empire
    empire.pop.push(pop.name);
    //pop size of the cell
    ns = cell.pop.size + pop.size;
    if(ns >3){
      if(ns >4) {
        ap.push(4);
      }
      ap = ap.random(map.RNG);
      cell.pop.size = ap;
      empire.power+=ns-ap;
    }
    else {
      cell.pop.size =ns;
    }
  }
  //cell has no pop claim it and make a new empire
  else {
    //load basic empire data
    eid=map.RNG.rndName();
    this._empires[eid] = {name:eid,color:map.RNG.rndColor(),power:0,pop:[pop.name],cells:[cid]};
    //set up the pop data
    cell.pop = {eid:eid,pop:[pop.name]};
    if(pop.size > 3){
      if(pop.size >4) {
        ap.push(4);
      }
      ap = ap.random(map.RNG);
      cell.pop.size = ap;
      this._empires[eid].power+=pop.size-ap;
    }
    else {
      cell.pop.size = pop.size;
    }
  }

  this._people[pop.name]=pop;
  this.empireExpand(eid);
}
