EQUIPMENT = {
//////////////Heavy - 2H //////////////////////////////
	"Battle axe":{type:"weapon",range:["close"],tags:["2-h"],weight:2,dmg:1},
	"Maul":{type:"weapon",range:["close"],tags:["2-h"],weight:2,dmg:1},
	"Greatsword":{type:"weapon",range:["close"],tags:["2-h"],weight:2,dmg:1},
//////////////One handed //////////////////////////////
	"Sword":{type:"weapon",range:["close"],tags:[],weight:2,dmg:1},
	"Spear":{type:"weapon",range:["reach","thrown"],tags:[],weight:1,dmg:0},
	"Mace":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Warhammer":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
	"Axe":{type:"weapon",range:["close"],tags:[],weight:1,dmg:0},
//////////////Light weapon //////////////////////////////
	"Rapier":{type:"weapon",range:["close"],tags:["precise"],weight:1,dmg:0},
	"Short sword":{type:"weapon",range:["close"],tags:["precise"],weight:1,dmg:0},
	"Hatchet":{type:"weapon",range:["close","thrown"],tags:["precise"],weight:1,dmg:0},
	"Staff":{type:"weapon",range:["close"],tags:["precise"],weight:1,dmg:0},
//////////////Small weapon //////////////////////////////
	"Dagger":{type:"weapon",range:["hand","thrown"],tags:["precise"],weight:1,dmg:0},
	"Club":{type:"weapon",range:["close"],tags:["precise"],weight:1,dmg:0},
//////////////Ranged //////////////////////////////
	"Crossbow":{type:"weapon",range:["near"],tags:["bolt","reload"],weight:3,dmg:1},
	"Bow":{type:"weapon",range:["near","far"],tags:["arrow"],weight:1,dmg:1},
	"Sling":{type:"weapon",range:["near","far"],tags:["slingstone"],weight:1,dmg:1},
//////////////Armor /////////////////////////////////////////////////
	"Light armor":{type:"armor",tags:["worn"],weight:1,armor:1},
	"Medium armor":{type:"armor",tags:["worn","clumsy"],weight:3,armor:2},
	"Heavy armor":{type:"armor",tags:["worn","clumsy"],weight:4,armor:3},
//////////////////////////////////////////////////////////////////////
	"Shield":{type:"shield",names:["Shield"],tags:[],weight:2,armor:1}
}
STATS = ["Strength","Dexterity","Constitution","Wisdom","Intelligence","Charisma"];
ABILITIES = ["Bold","Clever","Mighty","Quick","Subtle","Wise"];
ABILITIESXSKILLS = {
	"Bold":["Influence","Leadership","Performance"],
	"Clever":["Arcana","Investigate","Notice","Technical"],
	"Mighty":["Melee Combat","Physique","Unarmed Combat"],
	"Quick":["Athletics","Pilot","Ranged Combat"],
	"Subtle":["Burglary","Deceive","Stealth"],
	"Wise":["Empathy","Knowledge","Scouting","Will"]
};
SKILLS = [ "Arcana", "Athletics", "Burglary", "Deceive", "Empathy", "Influence", "Investigate", "Knowledge",
	"Leadership", "Melee Combat", "Notice", "Performance", "Physique", "Pilot", "Ranged Combat", "Scouting",
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
DOMAINS = ["Air", "Animal", "Artifice", "Charm", "Community", "Earth", "Fertility", "Fire", "Force", "Glory", "Healing", "Knowledge", "Law",
  "Luck", "Magic", "Mind", "Night", "Nobility", "Protection", "Righteousness", "Spirit", "Strength", "Sun", "Time", "Travel",
	"Trickery", "War", "Water", "Wealth", "Weather", "Winter"];
DOMAINSXSKILLS = {
	"Air":["Athletics","Stealth","Leadership"],
	"Animal":["Scouting","Physique","Technical"],
	"Artifice":["Technical","Knowledge","Performance"],
	"Charm":["Performance","Influence","Physique"],
	"Community":["Empathy","Leadership","Melee Combat"],
	"Earth":["Physique","Will","Athletics"],
	"Fertility":["Notice","Knowledge","Empathy"],
	"Fire":["Ranged Combat","Arcana","Stealth"],
	"Force":["Ranged Combat","Physique","Stealth"],
	"Glory":["Melee Combat","Influence","Empathy"],
	"Healing":["Empathy","Technical","Melee Combat"],
	"Knowledge":["Knowledge","Technical","Physique"],
	"Law":["Technical","Investigate","Performance"],
	"Luck":["Pilot","Notice","Technical"],
	"Magic": ["Arcana","Technical","Stealth"],
	"Mind":["Knowledge","Investigate","Physique"],
	"Night":["Stealth","Arcana","Leadership"],
	"Nobility":["Influence","Leadership","Notice"],
	"Protection":["Empathy","Arcana","Melee Combat"],
	"Righteousness":["Will","Empathy","Deceive"],
	"Spirit":["Arcana","Stealth","Technical"],
	"Strength":["Physique","Influence","Technical"],
	"Sun":["Notice","Leadership","Deceive"],
	"Time":["Notice","Will","Athletics"],
	"Travel":["Athletics","Scouting","Leadership"],
	"Trickery":["Deceive","Stealth","Investigate"],
	"War":["Melee Combat","Leadership","Empathy"],
	"Water":["Unarmed Combat","Burglary","Will"],
	"Wealth":["Influence","Deceive","Empathy"],
	"Weather":["Performance","Arcana","Stealth"],
	"Winter":["Scouting","Will","Empathy"]
}
COLORDOMAINS = {
	"green":["Air","Animal","Healing","Plant","Weather"],
	"red":["Fire","Liberation","Luck","Sun","War"],
	"yellow":["Artifice","Earth","Knowledge","Nobility","Travel"],
	"white":["Glory","Law","Protection","Righteousness","Strength"],
	"black":["Charm","Community","Night","Trickery","Water"]
}
DOMAINSDOOM = ["Chaos", "Darkness", "Death", "Destruction", "Evil", "Madness"];
FEATS = ["Backstab","Toughness","Destroy Undead","Fray","Healing","Wizardry"];
POWERGROUPS = {
	"Air":["Armor Up","Aura (Wind)","Aura (Sonic)", "Sound Control", "Sonic Blast", "Resist Sonic", "Sonar"],
	"Animal":["Animal Control (Avian)","Animal Control (Land)","Animal Control (Marine)","Claws","Chameleon","Danger Sense", "Poison", "Size","Shapeshifter", "Shrinking", "Webbing", "Light Armor",  "Wall Crawling"],
	"Artifice":["Armor",],
	"Charm":["Charm Person", "Emotion Projection", "Hypnotic Voice", "Super Charisma"],
	"Community":["Charm Person",],
	"Earth": ["Armor","Armor Up", "Earth Control", "Form Wall"],
	"Fertility":["Aura (Thorns)","Claws","Chameleon","Growth", "Plant Animation", "Poison","Shrinking", "Size", "Tiny"],
	"Fire": ["Aura (Fire)","Control Fire", "Explosive Blast", "Fire Blast", "Flight", "Resist Fire"],
	"Force": ["Armor","Armor Up","Aura (Lightning)","Flight", "Force Bolt", "Force Field", "Force Projection", "Form Wall", "Projectile Fire", "Telekinesis"],
	"Glory":["Armor",],
	"Healing": ["Disease", "Healing", "Reanimation"],
	"Knowledge": ["Clairvoyance","Super Intelligence", "Omni-Lingual"],
	"Law":[],
	"Luck": ["Bad Luck","Danger Sense", "Good Luck"],
	"Magic": ["Astral Travel","Clairvoyance","Power Weapon", "True Sight","Detect Supernatural"],
	"Mind":["Danger Sense","Dream Control","Mind Shield", "Sleep", "Mind Blast", "Mind Control", "Mind Scan", "Psychic Weapon", "Telepathy"],
	"Night": ["Darkness", "Dream Control", "Invisibility", "Sleep", "Doesn’t Sleep"],
	"Nobility":["Charm Person",],
	"Protection":["Armor","Armor Up","Danger Sense", "Life Support", "Light Armor", "Sensory Protection", "Gas Protection", "Resist Acid", "Resist Fire", "Resist Cold", "Resist Electricity"],
	"Righteousness":[],
	"Spirit": ["Astral Travel","Clairvoyance","Danger Sense","Life Support", "Intangibility", "Immortality", "Invisibility", "Life Drain", "Telekinesis","Detect Supernatural","Summon Outsider", "Summon Servitor"],
	"Strength": ["Super Jumping", "Super Swimming", "Super Strength"],
	"Sun": ["Aura (Light)","Dazzle", "Laser", "Force Field", "Holographic Projection", "Invisibility", "True Sight"],
	"Time": ["Duplication", "Haste", "Portal", "Precognition", "Retrocognition", "Time Travel"],
	"Travel":["Apport", "Haste", "Super Dexterity", "Super Speed", "Dimensional Barrier", "Portal", "Teleport"],
	"Trickery":["Apport","Danger Sense",],
	"War": ["Claws","Explosive Blast", "Guided Missile", "Power Weapon", "Projectile Fire", "Super Dexterity", "Super Striker", "Super Shooter", "Webbing"],
	"Water": ["Blast (Acid)","Animal Control (Marine)", "Aura (Acid)","Cold Blast","Liquid Form", "Life Support", "Super Swimming", "Super Aquatic", "Water Control", "Resist Cold", "Water Breathing"],
	"Wealth":[],
	"Weather":["Gaseous Form", "Ice Storm", "Lightning", "Cold Blast", "Flight", "Weather Control", "Wind Control", "Resist Cold"],
	"Winter":["Armor Up","Aura (Cold)","Claws","Cold Blast","Form Wall", "Ice Storm", "Projectile Fire"]
}

CPX.makeHero = function (opts) {
  var hero = {};
  opts = typeof opts === "undefined" ? {} : opts;
  hero.uid = typeof opts.seed === "undefined" ? "H"+makeUID(31) : opts.seed;

  var hRNG = new RNG(hero.uid);

  var stats = [2,1,1,0,0,-1];
	hero._type="Hero";
  hero.name = hRNG.rndName();
	hero.gender = hRNG.TrueFalse() ? "male" : "female";
  hero.stats = hRNG.shuffleAr(stats);
	hero.location = "";
	hero.realm = "";
	hero.hp=6;
	hero.maxHP=6;
	hero.AP=30;
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

	var allRaces = opts.map.statPop().array;
	hero.race = allRaces.random(hRNG);

  //["Brute","Soldier","Officer","Elemental","Psion","Wizard","Diplomat","Engineer","Healer","Rogue","Investgator","Agent"];
  //["Bold","Clever","Mighty","Quick","Subtle","Wise"];
  var i = hero.stats.max().i;
  var hclass = [["Officer","Elemental"],["Wizard","Engineer","Investgator"],["Soldier","Brute"],["Elemental","Rogue","Agent"],["Rogue","Agent","Diplomat"],["Officer","Psion","Healer"]];
  hero.levels = [hclass[i].random(hRNG)];

	var classes= {
		Brute: {eq:[["Battle axe","Maul","Greatsword","Spear"],["Bow"],["Leather armor"]],
			start: ["Fray","Athletics","Toughness","Melee Combat","Physique"]
		},
		Soldier: {eq:[["Spear","Sword","Short sword","Rapier","Mace","Warhammer","Axe"],["Bow","Crossbow"],["Scale mail"],["Shield"]],
			start: ["Fray","Athletics","Toughness","Melee Combat","Ranged Combat"]
		},
		Officer: {eq:[["Sword","Short sword","Rapier"],["Bow"],["Chain mail"]],
			start:["Fray","Athletics","Melee Combat","Leadership",""]
		},
		Elemental: {eq:[["Staff"],["Sling"],[""]],
			start:["Fray","","","",""]
		},
		Psion: {eq:[["Staff"],["Sling"],[""]],
			start:["Fray","","","",""]
		},
		Wizard: {eq:[["Staff"],["Sling"],[""]],
			start:["Fray","Knowledge","Arcana","Wizardry","Influence"]
		},
		Engineer:{start:["Fray","Technical","","",""]
		},
		Healer:{start:["Fray","Knowledge","Empathy","",""]
		},
		Diplomat:{eq:[["Staff","Club"],["Sling"],["Leather armor"]],
			start:["Fray","Empathy","Influence","",""]
		},
		Rogue: {eq:[["Rapier","Dagger"],["Bow"],["Leather armor"]],
			start:["Fray","Athletics","Melee Combat","Burglary","Stealth"]
		},
		Investgator: {eq:[["Sword","Short sword","Rapier","Mace","Axe","Hatchet"],["Bow","Crossbow"],["Leather armor"]],
			start:["Fray","Investigate","Notice","Melee Combat",""]
		},
		Agent: {eq:[["Sword","Short sword","Rapier","Axe","Hatchet"],["Bow"],[""]],
			start:["Fray","Athletics","Unarmed Combat","Melee Combat","Backstab"]
		}
	};
	classes.Engineer.eq = classes.Healer.eq = classes.Diplomat.eq;

	hero.equipment.push("*$"+classes[hero.levels[0]].eq[0].random(hRNG));
	hero.equipment.push("$"+classes[hero.levels[0]].eq[1].random(hRNG));
	hero.equipment.push("*$Light armor");
	if(classes[hero.levels[0]].eq.length == 4){
		hero.equipment.push("*$"+classes[hero.levels[0]].eq[3].random(hRNG));
	}

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
			if(E.includes("$")){
				A = E.substr(2);
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
			if(E.includes("$")){
				W = E.substr(2);
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
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "Your journey is over!"});
	}
	else {
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "You have taken "+damage+" damage!"});
	}
}
CPX.heroFlee = function (map) {
	var hero = cpxCurrentHero, quick = hero.stats[3], R = xorRNG.DWRoll();
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
	var encounter = map._currentEncounter, foe = encounter[i], hero = cpxCurrentHero, cell = map.cells[hero.location],
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
			CPX.displayCurrentHeroInfo(hero.uid);
		}
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.heroStart = function (hid) {

}
CPX.heroMakeCurrent = function (hid) {
	cpxCurrentHero=cpxActive.heroes[hid];
	CPX.displayCurrentHeroInfo(hid);
}
CPX.heroAPCheck = function (AP,action) {
	if(cpxCurrentHero.AP+3<AP) {
		//they can't take action
		var n = noty({layout: 'topCenter', type: 'error', timeout: 1500, text: "You do not have enough AP to "+action+"."});
		return false;
	}
	else {
		//They can take action - reduce AP
		cpxCurrentHero.AP-=AP;
		//update display
		d3.select("#currentAP").html("AP "+cpxCurrentHero.AP);
		return true;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.heroEquipmentDisplay = function (hero) {
	var i=0, idx = 0, EC = "", name="", equipped="", html="";
	hero.equipment.forEach(function (E) {
		idx = 0;

		if(E[0]=="*"){
			idx=1;
			equipped="equipped";
		}

		if(E.includes("$")){
			name = E.substr(1+idx);
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
  var html = "<h3>"+hero.name+"<span class=rightAlign id=currentAP>AP "+hero.AP+"</span></h3><p>", levels={}, aspects={}, i=0;

	html+=hero.gender.capFirst()+" "+hero.race.capFirst();

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

	html+="</br><strong>Aspects:</strong> ";
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

	html+="<div class=center><strong>HP:</strong> "+hero.hp+" <strong>DMG:</strong> ";
	html+=CPX.heroBaseDamage(hero)+" <strong>Armor:</strong> "+CPX.heroArmor(hero)+"</div>";
	html+="<p><strong>Equipment:</strong> "+CPX.heroEquipmentDisplay(hero)+"</p>";

  return "<div class=hero data-uid="+hero.uid+" data-lv="+hero.levels.length+">"+html+"</div>";
}

///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroActionRest = function () {
	var hero = cpxCurrentHero;
	hero.hp = hero.maxHP;
	CPX.displayCurrentHeroInfo(hero.uid);
}
hexPlaneMap.prototype.heroActionExplore = function (cid) {
	var hero = cpxCurrentHero, map = this, cell = this.cells[cid];

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
			if(map.heroOvercome(cid,overcome)) {
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
	var hero = cpxCurrentHero;
	if(objExists(hero.resources[resource])){
		hero.resources[resource]++;
	}
	else {
		hero.resources[resource] = 1;
	}
}
hexPlaneMap.prototype.heroOvercome = function (cid,skill) {
	var hero = cpxCurrentHero, cell=this.cells[cid],
		bonus = CPX.heroSkillValue(hero,skill),
		R = xorRNG.DWRoll(), n={};

	if(R+bonus > 6){
		//success
		hero.deeds.push({t:this._time,cid:cid,action:"Trouble"});
		this.heroAddResource(this.empireRandomResource(cell.pop.eid));
		return true;
	}
	else {
		//failure yields XP
		hero.xp++;
		return false;
	}

}
///////////////////////////////////////////////////////////////////////////////////////////////
CPX.heroMoveRealm = function (hid,rid) {
	//set the hero's realm to the opts rid
	cpxActive.heroes[hid].realm = rid;
}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroMove = function (hid,cid) {
	var hero = cpxActive.heroes[hid];
	//set the hero's location to the cid
	hero.location = cid;
	//display the move on the hex map
	this.displayHeroMove(hero.uid);
}
hexPlaneMap.prototype.heroCellMoveCheck = function (cid) {
	//get the array of cells within one
	var cA= this.cellWithinX(cpxCurrentHero.location,1)[1].n;
	//if the cell clicked is in the array then queue the move
	if(cA.contains(cid)){
		//determine the time the move will take
		var AP = Math.floor(400/8/cpxCurrentHero.speed);
		//if the hero has the AP move them...
		if(CPX.heroAPCheck(AP,"move")){
			//move them
			this.heroMove(cpxCurrentHero.uid,cid);
			//call the cell enter function
			this.actionCellEnter(cid);
		}
	}
	//if no move return false
	return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////
hexPlaneMap.prototype.heroRandomPlace = function (hid) {
	//then find some land to place the hero on
	var cA = this.cellsByTerrain().land;
	cpxActive.heroes[hid].realm = this.uid;
	cpxActive.heroes[hid].location = cA.random(this.RNG);
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
    tmpHeros.push(CPX.makeHero({map:map}));
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

		cpxActive.heroes[seed]=CPX.makeHero({seed:seed,map:map});
		map._heroes.push(seed);
    console.log(CPX.makeHero({seed:seed,map:map}));
		map.heroRandomPlace(seed);
		CPX.heroMakeCurrent(seed);
		CPX.displayActiveHeroList();

		var n = noty({layout: 'topCenter', type: 'information', text: 'Zoom with the mousewheel. </br>Drag by holding the left mouse button.'});
  });

	var herohtml = "<strong>Select a Hero</strong></br>Click on the Hero you wish to be to start."
	var n = noty({layout: 'center', type: 'alert', timeout: 1500, text: herohtml});
}
hexPlaneMap.prototype.heroGenMore = function () {
	$("#notify .content").empty();
	this.heroRandomGen();
}
