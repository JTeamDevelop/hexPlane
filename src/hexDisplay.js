//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Display
d3.select("#realmStart").on("click",function(){
  var uid = $(".map").attr("id"), map = cpxActive.realms[uid];
  if(!map._active){
    map._active = true;
    map._timer = setInterval(function(){ CPX.activeRealm(map.uid); }, 20000);
    $(this).html("Stop");
  }
  else {
    map._active = false;
    clearInterval(map._timer);
    $(this).html("Start");
  }
});
d3.selectAll(".fileOptions").on("click",function(){
  var id = $(this).attr("id");
  if(id=="fNew"){
    CPX.newRealm();
  }
  else if(id=="fLoad"){
    if(cpxSavedList.realms.length==0){ return; }

    $("#notify").removeClass("wide");
    $("#notify").addClass("slim");

    var html="<h3 class=center>Planes</h3>";
    for (var i = 0; i < cpxSavedList.realms.length; i++) {
      //make sure that the plane isn't active
      if(!objExists(cpxActive.realms[cpxSavedList.realms[i].uid])){
        //if it isn't active Display as an option to load
        html+="<div class='realm center' data-uid='"+cpxSavedList.realms[i].uid+"'>"+cpxSavedList.realms[i].name+"</div>";
      }
    }
    html += "<div class='buttons center'><button id=loadCancel >Cancel</button></div>";
    html = "<div id=loadRealmsList>"+html+"</div>";
    d3.select("#notify .content").html(html);
    $("#notify").slideDown();

    d3.select("#loadCancel").on("click",function(){
      $("#notify").slideUp();
      $("#notify .content").empty();
    });
    d3.selectAll("#loadRealmsList .realm").on("click",function(){
      var seed = $(this).attr("data-uid");
      $("#notify").slideUp();
      $("#notify .content").empty();
      CPX.dbLoad(seed);
    });
  }
  else if(id=="fSave") {
    CPX.dbSave();
  }
});

CPX.displayRealm = function (rid) {
  $("#logo").hide();
  $("#time").empty();
  $("#heroCurrent").empty();
  $("#dInfo").empty();
  $("#heroOptions").empty();

  var map = cpxActive.realms[rid];
  map.displaySetup();
  map.addTime(0);
  map.displayAllHex();
  map.popDisplay();

  for (var x in cpxActive.heroes){
    if(cpxActive.heroes[x].realm == rid){
      map.displayHeroToMap(x);
    }
  }

  var panZoomHex = svgPanZoom('#'+map.uid);
  $("#realmStart").css({"display":"inline-block"});
}

CPX.displayCurrentHeroInfo = function () {
  var hero = cpxCurrentHero,
    html = "<div class='center header'>Active Hero</div>";
  d3.select("#heroCurrent").html(CPX.heroDisplay(hero));
  $("#heroCurrent .hero").prepend(html);
  $("#heroCurrent").slideDown();
}

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
}
hexPlaneMap.prototype.displaySetup = function () {
  var map = this, D= this.mapDimensions();
  var svg = d3.select("#hexPlane").append("svg")
  	.attr("id",this.uid)
    .attr("data-uid",this.uid)
    .classed({'map': true})
    .attr("width", D.width)
    .attr("height", D.height);

  var hex = svg.append("g").classed({'gHex': true});
	var hexClimate = svg.append("g").classed({'gClimate': true});
  var hexHeroes = svg.append("g").classed({'gHeroes': true});

  d3.select("#title").html("<h1>"+this.name+"</h1>");
  d3.select("#hexStats").html("<div class=center id=seed><span id=seedN>"+this.uid+"</span><br><span class=title>Seed</span></div>");
  $("#fSave").show();

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

    if(id == "gKey"){
      $("#hexKey").slideToggle();
    }

    if(id == "gStats"){
      $("#hexStats").slideToggle();
    }

    //toggle dots on and off
    d3.select("."+id).style({opacity:opacity});

		//toggle selected class
		sel.classed("selected", !sel.classed("selected"));
	});

	map.key();

}
hexPlaneMap.prototype.displayComplete = function (hid) {
  d3.selectAll(".hex").on("click", function(){
    var hex = d3.select(this).datum();
    var cid = hex[0]+","+hex[1];
    console.log(map.cells[cid]);
    map.displayCellInfo(cid);
    console.log(map.heroCellMoveCheck(cid));
    $("#dInfo").show();
  });
}
hexPlaneMap.prototype.displayHeroMove = function (hid) {
  var map = this, hero = cpxActive.heroes[hid],
    cell = this.cells[hero.location],
    hdata = [cell.x,cell.y],
    center = cellCenter(map,hdata);

  d3.select("#hsvg_"+hid)
    .attr("x", center[0]-4.5)
    .attr("y", center[1]-4.5);
}
hexPlaneMap.prototype.displayHeroToMap = function (hid) {
  var map = this, hero = cpxActive.heroes[hid],
    cell = this.cells[hero.location],
    hdata = [cell.x,cell.y],
    center = cellCenter(map,hdata);

    hdata.hero = hero;

  d3.select(".gHeroes").append("rect").data([hdata])
    .classed({'svgHero': true})
    .attr("id", "hsvg_"+hid)
    .attr("x", center[0]-4.5)
    .attr("y", center[1]-4.5)
    .attr("width", 9)
    .attr("height", 9)
    .style({fill: "LawnGreen" , "stroke":"rgb(0,0,0)", "transform":"rotate(45,"+center[0]+","+center[1]+")"})
    .on("click",function(){
      var chero = d3.select(this).datum();
      console.log(chero);
    });

}
hexPlaneMap.prototype.displayAllHex = function () {
  for (var x in this.cells){
    this.displayHex(x);
  }
}
hexPlaneMap.prototype.displayHex = function (cid) {
  var map = this, cell = this.cells[cid], cdata= [[cell.x,cell.y]];
  cdata[0].data = cell;

  d3.select(".gHex").append("path").data(cdata)
    .classed({'hex': true})
    .attr("d", function(cell){
      return drawCell(map,cell);
    })
    .style({fill: function (cell) {
        if(cell.data.terrain>-1) {
          return TERRAIN[cell.data.terrain].color;
        }
    }});

  d3.select(".gClimate").append("path").data(cdata)
    .classed({'hex': true})
    .attr("d", function(cell){
      return drawCell(map,cell);
    })
    .style({fill: function (cell) {
      if(cell.data.climate>-1) {
        return CLIMATE[cell.data.climate].color;
      }
    }});
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
        var cid = cdata[0]+","+cdata[1];
        map.displayCellInfo(cid);
        console.log(map.cells[cid]);
        console.log(map.heroCellMoveCheck(cid));
    });
}
hexPlaneMap.prototype.displayCellInfo = function (cell) {
  var map = this, data = this.cells[cell];
  var html="<div class=square style='background:"+TERRAIN[data.terrain].color+"'></div>"
  html+="<strong>"+TERRAIN[data.terrain].name+" ("+CLIMATE[data.climate].name+")</strong>";

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

  if(typeof data.pop !== "undefined"){
    var empire = map._empires[data.pop.eid]
    html+="</br>"+empire.name+" "+sizes[Math.floor(data.pop.size)-1];
  }

  if(typeof data.site !== "undefined"){
    var site = data.site;
    html+="</br>"+site.tags[0]
  }

  if(typeof data.ruin !== "undefined"){
    var ruin = data.ruin;
    html+="</br><strong>"+ruin.race+" Ruin</strong>";
    html+="</br>"+ruin.tags[0]+" ("+sizes[Math.floor(ruin.size)-1]+")";
  }

  d3.select("#dInfo").html(html);
  $("#dInfo").show();
}
hexPlaneMap.prototype.popDisplay = function () {
	var svg = d3.select(".map"), map=this, popdata = map.popData();

  this.makePoints('gSites','site point',popdata.sites,function () { return 3; },function () { return 'Gold'; });
  this.makePoints('gRuins','ruin point',popdata.ruins,function () { return 3; },function () { return 'gray'; });
  this.makePoints('gEmpires','empire point',popdata.pop,function () { return 3; },function (empire) { return map._empires[empire.data.eid].color; });

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

  this.displayComplete();

  function ttData (cell) {
    var html="<strong>"+TERRAIN[cell.terrain].name+" ("+CLIMATE[cell.climate].name+")</strong>";

    if(objExists(cell.pop)){
      var empire = map._empires[cell.pop.eid]
      html+="</br>"+empire.name+" "+sizes[Math.floor(cell.pop.size)-1];
    }

    if(objExists(cell.site)){
      var site = cell.site;
      html+="</br>"+site.tags[0]
    }

    if(objExists(cell.ruin)){
      var ruin = cell.ruin;
      html+="</br><strong>"+ruin.race+" Ruin</strong>";
      html+="</br>"+ruin.tags[0]+" ("+sizes[Math.floor(ruin.size)-1]+")";
    }

    return html;
  }

}
