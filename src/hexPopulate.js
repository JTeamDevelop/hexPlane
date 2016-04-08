/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////
//Functions to populate the hexPlane
//This pulls a set of MTG cards to help with random generation of races
hexPlaneMap.prototype.newPopulation = function () {
  var map = this;
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
      map._set = pop;
      map.populate();
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
///////////////////////////////////////////////////////////////////////////////////
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
    card = this.newCard();
    //if it isn't a land
    if(card.rarity!="l"){
      //test if the card is a creature
      if(card.types.indexOf("creature")>-1) {
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
      card = this.newCard();
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
  var race = mapRaces(card.rarity,this.RNG), map = this, cell = map.cells[cid];

  var alltags = [], tlist = ["types","supertypes","subtypes"];
  for (var i = 0; i < tlist.length; i++) {
    if(card[tlist[i]].length>0){
      alltags = alltags.concat(card[tlist[i]]);
    }
  }
  alltags.unique();

  var tags=[];
  if(alltags.contains("enchantment") || alltags.contains("sorcery") || alltags.contains("instant")) {
    tags.push(this.colorTags(card).random(this.RNG));
  }

  if(alltags.contains("legendary") || alltags.contains("planeswalker")) {
    tags.push("Superhero");
  }

  if(alltags.contains("land")) {
    this.cells[cid].tags.push("Resource");
  }

  var stats = [[1,1,0,0,-1,-1],[2,1,0,0,-1,-2]];

  var pop = {
    race: race,
    rarity:card.rarity,
    aggro:map.RNG.FateRoll(),
    tags:tags,
    colors:card.colors,
    size:card.cmc,
    name:map.RNG.rndName(),
    stats:map.RNG.shuffleAr(stats.random(map.RNG)),
    hexcolor:map.RNG.rndColor()
  };

  //artifact chance
  if(this.RNG.random()<0.02) {
    pop.artifact=[this.makeArtifact()];
    cell.tags.push("Artifact");
  }

  //if there is black there is doom
  if(this.RNG.random()<0.15) {
    if(pop.aggro==0) {
      pop.aggro++;
    }
    pop.aggro=Math.abs(pop.aggro);
    pop.doom=this.makeDoom(cid);
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

  this._population[pop.name]=pop;
  this.empireExpand(eid);
}
