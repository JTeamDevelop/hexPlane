var cpxRealms = localforage.createInstance({
  name: "CPX Realm DB"
}),
cpxHeroes = localforage.createInstance({
  name: "CPX Hero DB"
}),
cpxWorkers = {};
cpxCurrentHero = {};
cpxActive = {realms:{},heroes:{}};
cpxSavedList = {
  realms: [{uid:"C3Z8pg1tQEmagCUYG7BhKZtlDUbeZ9",name:"Sovedi",type:"Plane"},
    {uid:"FUa3nS5A990dbMfEJ2TE3ttGmBs0pT",name:"Arin",type:"Plane"},
    {uid:"d9yA4VezzuF1ybMsCsuIkySqHgJZXx",name:"Teleis",type:"Plane"}],
  heroes:[]
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
CPX.dbSavedItemList = function() {
  var fullList = ["C3Z8pg1tQEmagCUYG7BhKZtlDUbeZ9","FUa3nS5A990dbMfEJ2TE3ttGmBs0pT","d9yA4VezzuF1ybMsCsuIkySqHgJZXx"], realm={};
  cpxRealms.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback will be executed for every item in the database.
    if(!fullList.contains(key)){
      fullList.push(key);
      realm=value;
      realm.uid=key;
      cpxSavedList.realms.push(realm);
    }
  }).then(function() {
    //Do this next
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

  var realmName = "";
  cpxHeroes.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback will be executed for every item in the database
    if(!fullList.contains(key)){
      fullList.push(key);
      realm = arrayObjLocate(cpxSavedList.realms,"uid",value.realm);
      if(realm.i >-1){
        cpxSavedList.heroes.push({uid:key,name:value.name,realm:realm.val.name,rid:realm.val.uid});
      }
    }
  }).then(function() {
    //Do this next
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });
}

CPX.dbSave = function() {
  var n = {};
  for (var x in cpxActive.realms){
    cpxRealms.setItem(x, {t:cpxActive.realms[x]._time,name:cpxActive.realms[x].name,type:cpxActive.realms[x]._type}).then(function (value) {
      noty({layout: 'topCenter', type: 'success', timeout: 500, text: 'Plane saved'});
      // Do other things once the value has been saved.
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  }

  for (var x in cpxActive.heroes){
    cpxHeroes.setItem(x, cpxActive.heroes[x]).then(function (value) {
      noty({layout: 'topCenter', type: 'success', timeout: 500, text: 'Hero saved'});
      // Do other things once the value has been saved.
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  }
}

CPX.dbLoadHeroNumbers = function (hero) {
  var fields = ["AP","hp","maxHP","xp","speed"];
  for(var x in hero){
    if(fields.contains(x)){
      hero[x] = Number(hero[x]);
    }
  }
  return hero;
}

CPX.dbLoad = function(seed,name) {
  var n = noty({layout: 'topCenter', type: 'success', timeout: 500, text: 'Generating map.'}),
    map = new hexPlaneMap(seed), html = "", hid="", nHero=0, firstHero="";

  setTimeout(function(){
    map.random();
    n = noty({layout: 'topCenter', type: 'success', timeout: 500, text: 'Populating.'});

    //pull heroes that are on the plane
    var hlist = CPX.activeHeroByRealm(seed);
    for (var i = 0 ; i<hlist.length ; i++) {
      hid = hlist[i];
      cpxHeroes.getItem(hid).then(function (value) {
        //Load the hero into Active and change things to numbers
        cpxActive.heroes[hid]=CPX.dbLoadHeroNumbers(value);
        CPX.displayActiveHeroList();
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
      });
    }
  }, 1000);

  setTimeout(function(){
    map.populate();
    console.log(map);

    html = "<div class='realm center' data-uid='"+map.uid+"'><span class='column center'>"+map.name+"</span><span class='column center'>"+map._type+"</span></div>";
    $("#activeRealms").show();
    $("#activeRealms").append(html);

    d3.selectAll("#activeRealms .realm").on("click",function(){
      var uid = $(this).attr("data-uid");
      $("#title").empty();
      $("#hexPlane").empty();
      n = noty({layout: 'topCenter', type: 'success', timeout: 1000, text: 'Displaying new realm.'});

      setTimeout(function(){
        //display the realm
        CPX.displayRealm(uid);
        //get a list of heroes
        var hlist = CPX.activeHeroByRealm(seed);
        if(hlist.length >0) {
          //if there are heroes, make the first the current
          CPX.heroMakeCurrent(hlist[0]);
        }
        //show the active heroes box and add hero button
        $("#activeHeroes").show();
        $("#addHero").show();
        //show time options
        $("#timeOptions").show();
      }, 1000);
    });
  }, 5000);

  cpxActive.realms[map.uid]=map;
}

CPX.activeHeroByRealm = function (rid) {
  var hlist = [];
  //pull heroes that are on the plane
  for (var i = 0 ; i<cpxSavedList.heroes.length ; i++) {
    if(cpxSavedList.heroes[i].rid == rid) {
      hlist.push(cpxSavedList.heroes[i].uid);
    }
  }
  return hlist;
}

CPX.newRealm = function (seed,type) {
  var n = noty({layout: 'topCenter', type: 'success', timeout: 500, text: 'Generating terrain.'});
  var map = new hexPlaneMap(seed);
  setTimeout(function(){
    map.random({display:true});
    n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Populating.'});
  }, 1000);

  setTimeout(function(){
    map.populate();
    console.log(map);

    map.heroRandomGen();
    var panZoomHex = svgPanZoom('#hexSVG');
  }, 5000);

  cpxActive.realms[map.uid]=map;
}
