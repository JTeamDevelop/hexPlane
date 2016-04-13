STATS = ["Strength","Dexterity","Constitution","Wisdom","Intelligence","Charisma"];
ABILITIES = ["Bold","Clever","Mighty","Quick","Subtle","Wise"];
SKILLS = {
	Arcana : ["Flashy","Subtle","Clever","Mighty","Quick","Wise"],
	Athletics : ["Mighty","Quick"],
	Burglary : ["Subtle","Clever","Quick"],
	Deceive : ["Flashy","Subtle","Clever"],
	Empathy : ["Subtle","Clever","Wise"],
	Influence : ["Subtle","Clever"],
	Investigate : ["Subtle","Clever","Wise"],
	Knowledge : ["Flashy","Subtle","Clever","Wise"],
	Leadership: ["Subtle","Clever","Wise"],
	"Melee Combat" : ["Flashy","Subtle","Clever","Mighty","Quick","Wise"],
	Notice : ["Clever","Quick"],
	Performance : ["Flashy","Clever"],
	Physique : ["Flashy","Mighty"],
	Pilot : ["Flashy","Clever","Quick"],
	"Ranged Combat" : ["Flashy","Subtle","Clever","Mighty","Quick","Wise"],
	Stealth : ["Subtle","Clever","Quick"],
	Technical : ["Flashy","Subtle","Clever","Quick","Wise"],
	"Unarmed Combat" : ["Flashy","Subtle","Clever","Mighty","Quick","Wise"],
	Will : ["Clever","Mighty","Wise"]
}
STATSXSKILLS = {
	Strength:["Physique","Melee Combat","Unarmed Combat"],
	Dexterity:["Athletics","Pilot", "Ranged Combat", "Stealth"],
	Constitution:[],
	Wisdom:["Empathy", "Notice", "Will"],
	Intelligence:["Arcana", "Burglary","Investigate", "Knowledge", "Technical"],
	Charisma:["Deceive", "Influence", "Leadership", "Performance"]
}
CLASSES = ["Fighter","Brute","Soldier","Officer","Elemental","Psion","Wizard","Diplomat","Engineer","Healer","Rogue","Investgator","Agent"];
DOMAINS = ["Air", "Animal", "Artifice", "Charm", "Community", "Darkness", "Earth", "Fire", "Glory", "Healing", "Knowledge", "Law",
  "Liberation", "Luck", "Magic", "Nobility", "Plant", "Protection", "Righteousness", "Strength", "Sun", "Travel", "Trickery",
  "War", "Water", "Weather"];
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
  hero.gifts = 1;
  hero.powers = 4;

  //["Fighter","Brute","Soldier","Officer","Elemental","Psion","Wizard","Diplomat","Engineer","Healer","Rogue","Investgator","Agent"];
  //["Strength","Dexterity","Constitution","Wisdom","Intelligence","Charisma"];
  var i = hero.stats.max().i;
  var hclass = [["Fighter","Brute"],["Rogue","Agent"],["Soldier","Elemental"],["Officer","Psion","Healer"],["Wizard","Engineer","Investgator"],["Officer","Diplomat"]];
  hero.levels = [hclass[i].random(hRNG)];

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

CPX.heroDisplay = function (hero) {
  var html = "<h3>"+hero.name+"</h3><p>", levels=[], aspects=[];

  hero.aspects.forEach(function(A){
    if(!aspects.contains(A)){
      aspects.push(A);
    }
  });
  html+="<strong>Aspects:</strong> "+aspects.join(", ");

  hero.levels.forEach(function(L){
    if(!levels.contains(L)){
      levels.push(L);
    }
  });
  html+="</br><strong>Professions:</strong> "+levels.join(", ");

  html+="</br>"+hero.stats[0]+" "+hero.stats[1]+" "+hero.stats[2];
  html+=" "+hero.stats[3]+" "+hero.stats[4]+" "+hero.stats[5];
  html+="</p>"

  return "<div class=hero data-uid="+hero.uid+" data-lv="+hero.levels.length+">"+html+"</div>";
}

hexPlaneMap.prototype.heroRandomGen = function () {
  $("#notify").removeClass("slim");
  $("#notify").addClass("wide");

  var tmpHeros = [];
  for (var i = 0; i < 4; i++) {
    tmpHeros.push(CPX.makeHero());
    $("#notify .content").append(CPX.heroDisplay(tmpHeros[i]));
  }

  $("#notify").slideDown();

  d3.selectAll("#notify .hero").on("click", function(){
    var seed = $(this).attr("data-uid");
    $("#notify").slideUp();
    console.log(CPX.makeHero({seed:seed}));
  });

}
