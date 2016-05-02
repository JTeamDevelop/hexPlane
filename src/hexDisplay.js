//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Display

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
  var map = this;
  var svg = d3.select("#hexPlane").append("svg")
  	.attr("id","hexSVG")
    .classed({'map': true})
    .attr("width", map._width)
    .attr("height", map._height);

  var hex = svg.append("g").classed({'gHex': true});
	var hexClimate = svg.append("g").classed({'gClimate': true});
  var hexClimate = svg.append("g").classed({'gHeroes': true});

  $("#title").append("<h1>"+this.name+"</h1>");
  $("#hexStats").append("<div class=center id=seed><span id=seedN>"+this.uid+"</span><br><span class=title>Seed</span></div>");

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
hexPlaneMap.prototype.displayCurrentHeroInfo = function (hid) {
  var html = "<div class='center header'>Active Hero</div>";
  d3.select("#heroCurrent").html(CPX.heroDisplay(this._heroes[hid]));
  $("#heroCurrent .hero").prepend(html);
  $("#heroCurrent").slideDown();
}
hexPlaneMap.prototype.displayHeroMove = function (hid) {
  var map = this, hero = this._heroes[hid],
    cell = this.cells[hero.location],
    hdata = [cell.x,cell.y],
    center = cellCenter(map,hdata);

  d3.select("#hsvg_"+hid)
    .attr("x", center[0]-4.5)
    .attr("y", center[1]-4.5);
}
hexPlaneMap.prototype.displayHeroToMap = function (hid) {
  var map = this, hero = this._heroes[hid],
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

    //cellWithinX

    $('.ttipHero').remove();
    $('.svgHero').tooltipsy({
  		content: function(cell) {
  			var data = cell[0].__data__.hero;
  			var html="<strong>"+data.name+"</strong>";
  			return html;
  		},
      className: 'tooltipsy ttipHero'
    });

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
  var data = this.cells[cell];
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

	$('path.hex').tooltipsy({
		content: function(cell){
      return ttData(cell[0].__data__.data);
    },
    className: 'tooltipsy ttipCell'
	});
  $('.point').tooltipsy({
		content: function(cell){
      return ttData(map.cells[cell[0].__data__[0]+","+cell[0].__data__[1]]);
    },
    className: 'tooltipsy ttipCell'
	});

}
