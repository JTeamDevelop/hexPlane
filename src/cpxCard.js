/////////////////////////////////////////////////////////////////////////////////
CPX.card = function (seed){
  var cRNG = new RNG(seed);
    var card={}, multi={c:1,u:1.5,r:3,m:6};
    var r= ["r","r","r","r","r","r","r","m"];
    var b= ["c","c","c","c","c","c","c","c","c","c","u","u","u","u",r.random(cRNG)];
  	card.rarity = b.random(cRNG);

    function sC() {
      return [COLORS.random(cRNG)];
    }
    function mC() {
      var m = [3,3,3,3,3,4,4,5], nc = [2,2,2,m.random(cRNG)], n = nc.random(cRNG);
      var c=[];
      for (var i = 0; i < n; i++) {
        c.push(COLORS.random(cRNG));
      }
      return c;
    }

    var c =[sC,sC,sC,sC,sC,sC,sC,sC,sC,mC];
    card.colors = c.random(cRNG)();

    card.tags = [];
    var rt=["land","land","land","artifact","artifact","artifact","superhero"];
    var t=["creature","power",rt.random(cRNG)];
    card.tags.push(t.random(cRNG));

    if(!card.tags.contains("artifact")){
      if(!card.tags.contains("superhero")){
        if(cRNG.random()<0.05){
          card.tags.push("artifact");
        }
      }
    }
    if(cRNG.random()<0.02){
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
      card.power = multi[card.rarity]*cRNG.RNDBias(bias[0], bias[1], bias[2], bias[3]);
    }

    //Domains or aspects
    var D = {
      white:["Light","Healing","Defense","Protection","Law","Peace","Community","Equality"],
      green:["Water","Air","Ice","Illusion","Divination","Logic","Knowledge","Trickery","Control"],
      red:["Life","Nature","Forests","Beasts","Transmutation","Strenth","Growth","Regeneration"],
      yellow:["Fire","Earth","Storms","Conjuration","Evocation","War","Fury","Chaos","Creativity"],
      black:["Darkness","Death","Illness","Necromancy","Corruption","Destruction","Domination","Greed"],
      gray:["Artifice","Machines","Technology","Golems"]
    }

    //push a color aspect for every color
    card.aspects = [];
    for (var i = 0; i < card.colors.length; i++) {
      card.aspects.push(D[card.colors[i]].random(cRNG));
    }
    //push more tags for higher power
    var max = Math.floor(card.power/3);
    if(max>card.colors.length) {
      var l = max-card.colors.length, nt="";
      for (var i = 0; i < l; i++) {
        //random color random tag
        card.aspects.push(D[card.colors.random(cRNG)].random(cRNG));
      }
    }

    return card;
}
