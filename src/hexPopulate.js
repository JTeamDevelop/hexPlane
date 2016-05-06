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
    r:["Dragon","Dragon","Elemental","Elemental","Giant","Golem"],
    m:[]
  }

  var races = {
    c:["Human",demi.random(cRNG)],
    u:[demi.random(cRNG),monstrous.random(),hybrid(),profs(["Human",demi.random(cRNG)])],
    r:["Dragon","Dragon","Elemental","Elemental","Giant","Golem","Treant",profs([demi.random(cRNG),monstrous.random(cRNG),hybrid(cRNG)]),profs([demi.random(cRNG),monstrous.random(cRNG),hybrid(cRNG)])],
    m:["Dragon Clan","Elemental Conflux","Demigod"]
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
	var map=this, cA=this.cellArray(), nCell = cA.length, cPop=[], ruins=[], cell="", r="", card ={}, track={r:0,s:0};

  //Load population and sites
	var n = Math.round(nCell/10);
  while(cPop.length <n)  {
    //random cell
    cell = cA.random(this.RNG);
    if(cPop.contains(cell)){
      continue;
    }
    cPop.push(cell);
    //either a new race or a ne site
    if(map.RNG.random() <0.6){
      this.newPeople(cell);
      track.r++;
    }
    else {
      this.newSite(cell);
      track.s++;
    }
  }
  console.log(track);

  //Ruins
  var n = Math.round(nCell/100);
  while (ruins.length < n){
    cell = cA.random(this.RNG);
    if(ruins.indexOf(cell) == -1){
      ruins.push(cell);
      this.newRuin(cell);
    }
  }

  CPX.doomInitial(this.uid,this.RNG);

  delete this._set;
  delete this.RNG;
}
///////////////////////////////////////////////////////////////////////////////////
//Adds races
CPX.people = function (seed,water) {
  var cRNG = new RNG(seed),
  card = CPX.card(seed),
  race = mapRaces(card.rarity,cRNG,water);

  var tags=[];
  if(card.tags.contains("power")) {
    tags.push(card.aspects.random(cRNG));
  }

  if(card.tags.contains("legendary") || card.tags.contains("superhero")) {
    tags.push("Superhero");
  }

  var stats = [[1,1,0,0,-1,-1],[2,1,0,0,-1,-2]];

  var pop = {
    race: race,
    rarity:card.rarity,
    aggro:cRNG.FateRoll(),
    tags:tags,
    colors:card.colors,
    size:card.power,
    name:cRNG.rndName(),
    stats:cRNG.shuffleAr(stats.random(cRNG)),
    hexcolor:cRNG.rndColor()
  };

  return pop;
}

hexPlaneMap.prototype.newPeople = function (cid) {
  cid = typeof cid === "undefined" ? this.noPopCell() : cid;
  var map = this, cell = map.cells[cid],
    water = cell.terrain == 0 ? true : false,
    card = CPX.card(this.uid+"@"+cid+"_P"),
    pop = CPX.people(this.uid+"@"+cid+"_P",water);

  if(card.tags.contains("land")) {
    cell.tags.push("Resource");
  }

  //artifact chance
  if(this.RNG.random()<0.02) {
    cell.tags.push("Artifact");
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
  this.empireExpand(eid,this.RNG);
}
