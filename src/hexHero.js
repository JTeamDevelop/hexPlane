EQUIPMENT = {
	"Dagger":{type:"weapon",range:["hand","thrown"],tags:[],weight:1,dmg:0},
	"Light sword":{type:"weapon",range:["close"],tags:["precise"],weight:1,dmg:0},
	"Short sword":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Sword":{type:"weapon",range:["close"],tags:[],weight:2,dmg:1},
	"Two-handed sword":{type:"weapon",range:["close"],tags:["2-h"],weight:2,dmg:1},
	"Club":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Staff":{type:"weapon",range:["close"],tags:["2-h"],weight:1,dmg:0},
	"Spear":{type:"weapon",range:["reach","thrown"],tags:[],weight:1,dmg:0},
	"Mace":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Warhammer":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Maul":{type:"weapon",range:["close"],tags:[],weight:2,dmg:1},
	"Hatchet":{type:"weapon",range:["close","thrown"],tags:[],weight:1,dmg:0},
	"Axe":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Battle axe":{type:"weapon",range:["close"],tags:[],weight:2,dmg:1},
	"Crossbow":{type:"weapon",range:["near"],tags:["bolt","reload"],weight:3,dmg:1},
	"Bow":{type:"weapon",range:["near","far"],tags:["arrow"],weight:1,dmg:1},
//////////////////////////////////////////////////////////////////////////////////////////
	"Light armor":{type:"armor",tags:["worn"],weight:1,armor:1},
	"Medium armor":{type:"armor",tags:["worn","clumsy"],weight:3,armor:2},
	"Heavy armor":{type:"armor",tags:["worn","clumsy"],weight:4,armor:3},
//////////////////////////////////////////////////////////////////////////////////////////
	"Shield":{type:"shield",names:["Shield"],tags:[],weight:2,armor:1}
}
STATS = ["Strength","Dexterity","Constitution","Wisdom","Intelligence","Charisma"];
ABILITIES = ["Bold","Clever","Mighty","Quick","Subtle","Wise"];
ABILITIESXSKILLS = {
	"Bold":["Influence","Leadership","Performance"],
	"Clever":["Arcana","Notice","Technical"],
	"Mighty":["Melee Combat","Physique","Unarmed Combat"],
	"Quick":["Athletics","Pilot","Ranged Combat"],
	"Subtle":["Burglary","Deceive","Stealth"],
	"Wise":["Empathy","Knowledge","Investigate","Will"]
};
SKILLS = [ "Arcana", "Athletics", "Burglary", "Deceive", "Empathy", "Influence", "Investigate", "Knowledge",
	"Leadership", "Melee Combat", "Notice", "Performance", "Physique", "Pilot", "Ranged Combat",
	"Stealth", "Technical", "Unarmed Combat", "Will"]
STATSXSKILLS = {
	Strength:["Physique","Melee Combat","Unarmed Combat"],
	Dexterity:["Athletics","Pilot", "Ranged Combat", "Stealth"],
	Constitution:[],
	Wisdom:["Empathy", "Notice", "Will"],
	Intelligence:["Arcana", "Burglary","Investigate", "Knowledge", "Technical"],
	Charisma:["Deceive", "Influence", "Leadership", "Performance"]
}
CLASSES = ["Fighter","Brute","Soldier","Officer","Elemental","Psion","Wizard","Diplomat","Engineer","Healer","Rogue","Investgator","Agent"];
DOMAINS = ["Air", "Animal", "Artifice", "Charm", "Community", "Earth", "Fire", "Glory", "Healing", "Knowledge", "Law",
  "Liberation", "Luck", "Magic", "Night", "Nobility", "Plant", "Protection", "Righteousness", "Strength", "Sun", "Travel", "Trickery",
  "War", "Water", "Weather"];
DOMAINSXSKILLS = {
	"Air":["Athletics","Stealth","Leadership"],
	"Animal":["Leadership","Physique","Technical"],
	"Artifice":["Technical","Knowledge","Performance"],
	"Charm":["Performance","Influence","Physique"],
	"Community":["Empathy","Leadership","Melee Combat"],
	"Earth":["Physique","Will","Athletics"],
	"Fire":["Ranged Combat","Arcana","Stealth"],
	"Glory":["Melee Combat","Influence","Empathy"],
	"Healing":["Empathy","Technical","Melee Combat"],
	"Knowledge":["Knowledge","Technical","Physique"],
	"Law":["Technical","Investigate","Performance"],
	"Liberation":["Performance","Athletics","Technical"],
	"Luck":["Pilot","Notice","Technical"],
	"Magic": ["Arcana","Technical","Stealth"],
	"Night":["Stealth","Arcana","Leadership"],
	"Nobility":["Influence","Leadership","Notice"],
	"Plant":["Notice","Knowledge","Empathy"],
	"Protection":["Empathy","Arcana","Melee Combat"],
	"Righteousness":["Will","Empathy","Deceive"],
	"Strength":["Physique","Influence","Technical"],
	"Sun":["Notice","Leadership","Deceive"],
	"Travel":["Athletics","Notice","Leadership"],
	"Trickery":["Deceive","Stealth","Investigate"],
	"War":["Melee Combat","Leadership","Empathy"],
	"Water":["Unarmed Combat","Burglary","Will"],
	"Weather":["Performance","Arcana","Stealth"]
}
COLORDOMAINS = {
	"green":["Air","Animal","Healing","Plant","Weather"],
	"red":["Fire","Liberation","Luck","Sun","War"],
	"yellow":["Artifice","Earth","Knowledge","Nobility","Travel"],
	"white":["Glory","Law","Protection","Righteousness","Strength"],
	"black":["Charm","Community","Night","Trickery","Water"]
}
DOMAINSDOOM = ["Chaos", "Darkness", "Death", "Destruction", "Evil", "Madness"];
POWERGROUPS = {"Weather":["Gaseous Form", "Ice Storm", "Lightning", "Cold Blast", "Flight", "Weather Control", "Wind Control", "Resist Cold"],
  "Animals":["Chameleon", "Claws/Fangs", "Animal Control", "Poison", "Size","Shapeshifter", "Shrinking", "Webbing", "Light Armor",  "Wall Crawling"],
  "Protection":["Armor", "Life Support", "Light Armor", "Sensory Protection", "Gas Protection", "Resist Acid", "Resist Fire", "Resist Cold", "Resist Electricity"],
  "Acid":["Acid Aura", "Acid Blast", "Life Support", "Poison", "Poison Gas", "Webbing", "Resist Acid", "Gas Protection", "Resist Poison"],
  "Cold": ["Cold Aura", "Cold Blast", "Armor Up", "Form Wall", "Ice Storm", "Projectile Fire"],
  "Charisma": ["Charm Person", "Emotion Projection", "Hypnotic Voice", "Super Charisma"],
  "Constitution": ["Life Support", "Regeneration", "Super Constitution", "Resist Poison", "Doesn’t Eat or Drink", "Immortality"],
  "Night": ["Darkness", "Dream Control", "Invisibility", "Sleep", "Doesn’t Sleep"],
  "Death": ["Life Drain", "Necromancy", "Reanimation", "Doesn’t Eat or Drink", "Doesn’t Sleep", "Immortality"],
  "Dexterity": ["Super Dexterity", "Super Jumping", "Swinging"],
  "Dreams": ["Dream Control", "Illusion", "Mind Shield", "Sleep"],
  "Earth": ["Control Armor Up", "Earth Control", "Form Wall"],
  "Lightning": ["Electrical Aura", "Electrical Control", "Electric Shock", "EMP", "Lightning", "Magnetic Control", "Resist Electricity"],
  "Flight": ["Flight", "Faster-than-Light", "Super Speed"],
  "Fire": ["Control Fire", "Explosive Blast", "Fire Aura", "Fire Blast", "Flight", "Resist Fire"],
  "Force": ["Force Bolt", "Force Field", "Force Projection", "Form Wall", "Telekinesis"],
  "Healing": ["Disease", "Healing", "Reanimation"],
  "Illusion": ["Glamour", "Illusion", "True Sight"],
  "Spirit": ["Intangibility", "Invisibility", "Life Drain", "Telekinesis","Detect Supernatural"],
  "Intelligence": ["Super Intelligence", "Omni-Lingual"],
  "Light": ["Dazzle", "Laser", "Force Field", "Holographic Projection", "Invisibility"],
  "Luck": ["Bad Luck", "Good Luck"],
  "Magic": ["Astral Travel", "Bestow (Power)", "Power Weapon", "True Sight","Detect Supernatural"],
  "Metamorphosis": ["Growth", "Shapeshifter", "Shrinking", "Stretching"],
  "Plants": ["Plant Animation", "Poison"],
  "Divination": ["Clairvoyance", "Precognition", "Retrocognition", "Veil"],
  "Size": ["Growth", "Shrinking", "Size", "Tiny"],
  "Weapons": ["Explosive Blast", "Guided Missile", "Power Weapon", "Projectile Fire", "Super Dexterity", "Super Striker", "Super Shooter", "Webbing"],
  "Speed": ["Haste", "Super Dexterity", "Super Speed", "Super Swimming"],
  "Sound": ["Hypnotic Voice", "Sound Control", "Sonic Aura", "Sonic Blast", "Resist Sonic", "Sonar"],
  "Summoning": ["Duplication", "Summon Outsider", "Summon Servitor"],
  "Strength": ["Super Jumping", "Super Swimming", "Super Strength"],
  "Telekinesis": ["Telekinesis", "Force Field", "Form Wall", "Projectile Fire"],
  "Telepathy": ["Illusion", "Mind Blast", "Mind Control", "Mind Scan", "Mind Shield", "Psychic Weapon", "Sleep", "Super Charisma", "Telepathy"],
  "Teleportation": ["Apport", "Dimensional Barrier", "Portal", "Teleport"],
  "Time": ["Duplication", "Haste", "Portal", "Precognition", "Retrocognition", "Time Travel"],
  "Water": ["Animal Control (Aquatic)", "Liquid Form", "Life Support", "Super Swimming", "Super Aquatic", "Water Control", "Resist Cold", "Water Breathing"],
  "Senses": ["Super Wisdom", "True Sight", "X-ray Vision", "Analytic Taste", "Danger Sense", "Heightened Smell", "Heightened Hearing", "Micro-Vision", "Super Vision"]
}

CPX.makeHero = function (opts) {
  var hero = {};
  opts = typeof opts === "undefined" ? {} : opts;
  hero.uid = typeof opts.seed === "undefined" ? "H"+makeUID(31) : opts.seed;

  var hRNG = new RNG(hero.uid);

  var stats = [2,1,1,0,0,-1];
  hero.name = hRNG.rndName();
  hero.stats = hRNG.shuffleAr(stats);
	hero.hp=6;
	hero.maxHP=6;
	hero.damage = "1d6";
	hero.attackActions=["Fight","Flee"];
	hero.deeds = [];
	hero.resources = {};
	hero.equipment = [];
	hero.followers = [];
	hero.xp = 0;
	hero.speed = 5;
  hero.gifts = 1;
  hero.powers = 4;

  //["Fighter","Brute","Soldier","Officer","Elemental","Psion","Wizard","Diplomat","Engineer","Healer","Rogue","Investgator","Agent"];
  //["Bold","Clever","Mighty","Quick","Subtle","Wise"];
  var i = hero.stats.max().i;
  var hclass = [["Officer","Soldier","Elemental"],["Wizard","Engineer","Investgator"],["Fighter","Brute"],["Elemental","Rogue","Agent"],["Rogue","Agent","Diplomat"],["Officer","Psion","Healer"]];
  hero.levels = [hclass[i].random(hRNG)];

	var basic = ["Dagger","Short sword","Club","Staff","Crossbow"], allWeapons = [],
		allWeilders = ["Soldier","Fighter","Brute","Agent"];

	for (var x in EQUIPMENT){
		if(EQUIPMENT[x].type=="weapon"){
			allWeapons.push(x);
		}
	}

	if(allWeilders.contains(hero.levels[0])){
		hero.equipment.push("*basic"+allWeapons.random(hRNG));
	}
	else {
		hero.equipment.push("*basic"+basic.random(hRNG));
	}
	hero.equipment.push("*basicLight armor");

  hero.aspects = [];
  var aspect = "";
  while (hero.aspects.length <2) {
    aspect = DOMAINS.random(hRNG);
    if(!hero.aspects.contains(aspect)) {
      hero.aspects.push(aspect);
    }
  }

  var np = [2,2,2,2,2,3,3,4], pg =[], hpg=[], ng="";
  for(var x in POWERGROUPS){
    pg.push(x);
  }

  np = np.random(hRNG);
  while (hpg.length < np) {
    ng = pg.random(hRNG);
    if(!hpg.contains(ng)){
      hpg.push(ng);
    }
  }

  return hero;
}
CPX.heroSkillValue = function (hero,skill) {
	var ability = [], value=[], mod=0;
	for (var x in ABILITIESXSKILLS){
		if(ABILITIESXSKILLS[x].contains(skill)){
			ability.push(x);
		}
	}
	ability.forEach(function (A) {
		value.push(hero.stats[ABILITIES.indexOf(A)]);
	});
	hero.aspects.forEach(function (A) {
		if(DOMAINSXSKILLS[A].indexOf(skill)==2){
			mod--;
		}
		else if(DOMAINSXSKILLS[A].indexOf(skill)>-1){
			mod++;
		}
	})
	return value.max().val+mod;
}
CPX.heroArmor = function (hero) {
	var armor = 0, A="";
	hero.equipment.forEach(function (E) {
		if(E[0]=="*"){
			if(E.includes("basic")){
				A = E.substr(6);
				if(objExists(EQUIPMENT[A].armor)){
					armor+=EQUIPMENT[A].armor;
				}
			}
		}
	});
	return armor;
}
CPX.heroBaseDamage = function (hero) {
	var W="", dice = hero.damage;
	hero.equipment.forEach(function (E) {
		if(E[0]=="*"){
			if(E.includes("basic")){
				W = E.substr(6);
				if(objExists(EQUIPMENT[W].dmg)){
					if(EQUIPMENT[W].dmg>-1) {
						dice+="+";
					}
					dice+=EQUIPMENT[W].dmg;
				}
			}
		}
	});
	return dice;
}
CPX.heroTakeDamage = function (hero,damage) {
	hero.hp-=damage;
	if(hero.hp < 0){
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "You journey is over!"});
	}
	else {
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "You have taken "+damage+" damage!"});
	}
}
CPX.heroFlee = function (map) {
	var hero = hero = map._currentHero, quick = hero.stats[3], R = xorRNG.DWRoll();
	if(R+quick > 6){
		map._currentEncounter = null;
		var n = noty({layout: 'topCenter', type: 'success', timeout: 1500, text: "You were able to flee the attack!"});
		$("#notify").slideUp();
	}
	else {
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "You weren't able to escape!"});
		hero.xp++;
	}
}
CPX.heroFight = function (map,i) {
	var encounter = map._currentEncounter, foe = encounter[i], hero = map._currentHero, cell = map.cells[hero.location],
		mighty = hero.stats[2], quick = hero.stats[3], armor = CPX.heroArmor(hero), R = xorRNG.DWRoll(), dmg=0, n={},
		melee = CPX.heroSkillValue(hero,"Melee Combat"), ranged=CPX.heroSkillValue(hero,"Ranged Combat");

	function retaliate() {
		encounter.forEach(function (E) {
			R = xorRNG.DWRoll();
			if(R+quick < 7){
				dmg = xorRNG.dice(E.dmg);
				if(dmg > armor){
					n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "The "+foe.name+" attacks!"});
					CPX.heroTakeDamage(hero,dmg-armor);
				}
			}
		})
	}

	if(R+mighty > 6){
		dmg = xorRNG.dice(CPX.heroBaseDamage(hero));
		foe.hp-=dmg;
		if(foe.hp<1){
			encounter.splice(i, 1);
			n = noty({layout: 'topCenter', type: 'success', timeout: 1500, text: "You have defeated the "+foe.name+"!"});
			if(encounter.length>0){
				map.displayEncounter();
			}
			else {
				//clear the nootify, remove the foe from the cell, reduce the trouble and push the deed to the hero
				$("#notify").slideUp();
				cell.tags.remove("foe");
				cell.pop.troubles--;
				hero.deeds.push({t:map._time,cid:hero.location,action:"Fight"});
				n = noty({layout: 'topCenter', type: 'success', timeout: 1500, text: "You have won!"});
			}
		}
		else {
			n = noty({layout: 'topCenter', type: 'success', timeout: 1500, text: "You have hurt the "+foe.name+"."});
		}
	}
	else {
		hero.xp++;
		dmg = xorRNG.dice(foe.dmg);
		if(dmg > armor){
			CPX.heroTakeDamage(hero,dmg-armor);
			map.displayCurrentHeroInfo(hero.uid);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.heroEquipmentDisplay = function (hero) {
	var i=0, idx = 0, EC = "", name="", equipped="", html="";
	hero.equipment.forEach(function (E) {
		if(E[0]=="*"){
			idx=1;
			equipped="equipped";
		}
		if(E.includes("basic")){
			name = E.substr(5+idx);
		}
		else {

		}

		if(i>0){
			html+=", ";
		}
		html+="<span class="+equipped+">"+name+"</span>";
		i++;
	});
	return html;
}
CPX.heroDisplay = function (hero) {
  var html = "<h3>"+hero.name+"</h3><p>", levels={}, aspects={}, i=0;

  hero.aspects.forEach(function(A){
    if(objExists(aspects[A])){
      aspects[A]++;
    }
		else {
			aspects[A]=1;
		}
  });

	hero.levels.forEach(function(L){
    if(objExists(levels[L])){
      levels[L]++;
    }
		else {
			levels[L]=1;
		}
  });

	html+="<strong>Aspects:</strong> ";
	for (var x in aspects){
		if(i>0){
			html+=", ";
		}
		html+=x;
		if(aspects[x]>1){ html+=" "+aspects[x]; }
		i++;
	}

	html+="</br><strong>Professions:</strong> ";
	i=0;
	for(var x in levels) {
		if(i>0){
			html+=", ";
		}
		html+=x;
		if(levels[x]>1){ html+=" "+levels[x]; }
		i++;
	}
	html+="</p>";

  html+="<div class=center>";
	for (var i = 0; i < ABILITIES.length; i++) {
		html+="<div class='center inline ability'><span class=title>"+ABILITIES[i]+"</span></br>"+hero.stats[i]+"</div>";
	}
  html+="</div>";

	html+="<p><div class=center><strong>HP:</strong> "+hero.hp+" <strong>DMG:</strong> ";
	html+=CPX.heroBaseDamage(hero)+" <strong>Armor:</strong> "+CPX.heroArmor(hero)+"</div>";
	html+="<strong>Equipment:</strong> "+CPX.heroEquipmentDisplay(hero)+"</p>";

  return "<div class=hero data-uid="+hero.uid+" data-lv="+hero.levels.length+">"+html+"</div>";
}

///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroStart = function () {

}
hexPlaneMap.prototype.heroEndTurn = function () {
	this._currentHero=null;
	this.queueCheck();
}
hexPlaneMap.prototype.heroMakeCurrent = function (hid) {
	this._currentHero=this._heroes[hid];
	this.displayCurrentHeroInfo(hid);
}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroActionRest = function () {
	var hero = this._currentHero;
	hero.hp = hero.maxHP;
	this.displayCurrentHeroInfo(hero.uid);
}
hexPlaneMap.prototype.heroActionExplore = function (opts) {
	var hero = this._currentHero, cell = this.cells[opts.cid];

	if(cell.pop.troubles<1){
		return;
	}
	var T = TROUBLE.random(), O=T.overcome.random();

	$("#notify").removeClass("wide");
  $("#notify").addClass("slim");
	$("#notify .content").empty();

	var html="<div id=Help><div class=center>"+T.name+"</div><div class='buttons center'>";
	html+="<button data-action=Nothing>Continue On</button><button data-action=Help data-overcome='"+O+"'>Help</button></div></div>";
	d3.select("#notify .content").html(html);
	$("#notify").slideDown();

	d3.selectAll("#Help button").on("click", function(){
		var action = $(this).attr("data-action");
		if(action == "Nothing"){

		}
		if(action == "Help"){
			var overcome = $(this).attr("data-overcome");
			if(map.heroOvercome(cid,T)) {
				var n = noty({layout: 'center', type: 'success', timeout: 1500, text: "Success!"});
				cell.pop.troubles--;
			}
			else {
				var html = "You tried, but were unable to overcome the problem. At least you learned from the experience.";
				var n = noty({layout: 'center', type: 'warning', timeout: 1500, text: html });
			}
		}

		$("#notify").slideUp();
	});

}

///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroAddResource = function (resource) {
	var hero = this._currentHero;
	if(objExists(hero.resources[resource])){
		hero.resources[resource]++;
	}
	else {
		hero.resources[resource] = 1;
	}
}
hexPlaneMap.prototype.heroOvercome = function (cid,trouble) {
	var hero = this._currentHero, cell=this.cells[cid], overcome = trouble.overcome[1],
		ability = TROUBLEOVERCOME[overcome].random(),
		ids = ABILITIES.indexOf(ability),
		bonus = hero.stats[ids],
		R = xorRNG.DWRoll();

		if(R+bonus > 6){
			ability = TROUBLEOVERCOME[overcome].random();
			ids = ABILITIES.indexOf(ability);
			bonus = hero.stats[ids];
			R = xorRNG.DWRoll();

			if(R+bonus+1 > 6) {
				this._currentHero.deeds.push([this._time,"Trouble",cid,cell.pop.eid]);
				this.heroAddResource(this.empireRandomResource(cell.pop.eid));
				return true;
			}
			//failure yields XP
			hero.xp++;
			return false;
		}
		else {
			//failure yields XP
			hero.xp++;
			ability = TROUBLEOVERCOME[overcome].random();
			ids = ABILITIES.indexOf(ability);
			bonus = hero.stats[ids];
			R = xorRNG.DWRoll();

			if(R+bonus-1 > 6) {
				this._currentHero.deeds.push([this._time,"Trouble",cid,cell.pop.eid]);
				this.heroAddResource(this.empireRandomResource(cell.pop.eid));
				return true;
			}
			//failure yields XP
			hero.xp++;
			return false;
		}

}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroMove = function (opts) {
	//set the hero's location to the opts cid
	this._currentHero.location = opts.cid;
	//display the move on the hex map
	this.displayHeroMove(this._currentHero.uid);
	//call the cell enter function
	this.cellEnter(opts.cid);
}
hexPlaneMap.prototype.heroCellMoveCheck = function (cid) {
	//get the array of cells within one
	var cA= this.cellWithinX(this._currentHero.location,1)[1];
	//if the cell clicked is in the array then queue the move
	if(cA.contains(cid)){
		//determine the time the move will take
		var nT = this._time+Math.floor(400/8/this._currentHero.speed);
		//add a queue action for the move
		this.queueNew(nT,"heroMove",{cid:cid,hid:this._currentHero.uid});
		//check the queue for the next action
		this.heroEndTurn();
	}
	//if no move return false
	return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroRandomPlace = function (hid) {
	//then find some land to place the hero on
	var cA = this.cellsByTerrain().land;
	this._heroes[hid].location = cA.random(this.RNG);
	this.displayHeroToMap(hid);

	this.queueNew(1,"heroStart",{hid:hid});
	this.queueStart();
}
hexPlaneMap.prototype.heroRandomGen = function () {
	var map = this;

  $("#notify").removeClass("slim");
  $("#notify").addClass("wide");

  var tmpHeros = [];
  for (var i = 0; i < 4; i++) {
    tmpHeros.push(CPX.makeHero());
    $("#notify .content").append(CPX.heroDisplay(tmpHeros[i]));
  }

	var genMore = "<div class='buttons center'><button type=button id=btnGenMore class=center>Generate Four More Heroes</button></div>"
	$("#notify .content").append(genMore);

  $("#notify").slideDown();

	d3.select("#btnGenMore").on("click", function(){
    map.heroGenMore();
  });

  d3.selectAll("#notify .hero").on("click", function(){
    var seed = $(this).attr("data-uid");

		$("#notify").slideUp();
		$("#notify .content").empty();

		map._heroes[seed] = CPX.makeHero({seed:seed});
    console.log(CPX.makeHero({seed:seed}));
		map.heroRandomPlace(seed);

		var n = noty({layout: 'topCenter', type: 'information', text: 'Zoom with the mousewheel. </br>Drag by holding the left mouse button.'});
  });

	var herohtml = "<strong>Select a Hero</strong></br>Click on the Hero you wish to be to start."
	var n = noty({layout: 'center', type: 'alert', timeout: 1500, text: herohtml});
}
hexPlaneMap.prototype.heroGenMore = function () {
	$("#notify .content").empty();
	this.heroRandomGen();
}
