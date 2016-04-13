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

    d3.select("#hexKey").append("div")
      .attr("id", "cellInfo");


    var next = "<div class=buttons><button type=button id=btnActMonth>Progress One Month</button></div>"
    d3.select("#hexKey").append("div")
        .attr("id", "actions")
        .html(next);

  var map =this;
  d3.select("#btnActMonth").on("click", function(){
    map.act();
  });

}
hexPlaneMap.prototype.displaySetup = function () {
  var map = this;
  var svg = d3.select("#hexPlane").append("svg")
  	.classed({'map': true})
    .attr("width", map._width)
    .attr("height", map._height);

  var hex = svg.append("g").classed({'gHex': true});
	var hexClimate = svg.append("g").classed({'gClimate': true});

  var hinfo = "<h1>"+this.name+"</h1>";
  hinfo+="<strong>Seed: </strong>"+this.uid;
  hinfo+="<h3>Views</h3><span class=selView id=gClimate>Climate</span>";
  hinfo+="</br><span class='selView selected' id=gEmpires>Population</span>";
  hinfo+="</br><span class='selView selected' id=gSites>Sites</span>";
  hinfo+="</br><span class='selView selected' id=gRuins>Ruins</span>";

  d3.select("#hexKey").append("div")
    .attr("id", "pInfo")
    .html(hinfo);

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

    //toggle dots on and off
    d3.select("."+id).style({opacity:opacity});

		//toggle selected class
		sel.classed("selected", !sel.classed("selected"));
	});

	map.key();

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
    }})
    .on("click", function(){
      var hex = d3.select(this).datum();
      var cid = hex[0]+","+hex[1];
      console.log(map.cells[cid]);
  });
}
hexPlaneMap.prototype.displayPoint = function (cid,gclass,data) {

  d3.select(".g"+gclass).append("circle").data(data)
  .attr("class",gclass)
  .attr("cx", function(cdata){
    return cellCenter(map,cdata)[0];
  })
  .attr("cy", function(cdata){
    return cellCenter(map,cdata)[1];
  })
  .attr("r", function(cdata){ return size(cdata); })
  .style({fill: function(cdata){ return color(cdata); }});

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
        console.log(cdata);
    });
}
hexPlaneMap.prototype.cellDisplay = function (cell) {
  var data = this.cells[cell];
  var html="<h3>Cell "+cell+"</h3>";
  html+="<strong>"+TERRAIN[data.terrain].name+" ("+CLIMATE[data.climate].name+")</strong>";

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

  if(typeof data.pop !== "undefined"){
    var empire = map._empires[data.pop.eid]
    html+="</br>"+empire.name+" "+sizes[data.pop.size-1];
  }

  if(typeof data.site !== "undefined"){
    var site = data.site;
    html+="</br>"+site.tags[0]
    html+="</br>"+site.tags[1]
  }

  if(typeof data.ruin !== "undefined"){
    var ruin = data.ruin;
    html+="</br><strong>"+ruin.race+" Ruin</strong>";
    html+="</br>"+ruin.tags[0]+" ("+ruin.size+")";
  }

  html+="</br>"+data.tags.join(" ,");

  d3.select("#cellInfo").html(html);
}
hexPlaneMap.prototype.popDisplay = function () {
	var svg = d3.select(".map"), map=this, popdata = map.popData();

  this.makePoints('gSites','site',popdata.sites,function () { return 3; },function () { return 'Gold'; });
  this.makePoints('gRuins','ruin',popdata.ruins,function () { return 3; },function () { return 'gray'; });
  this.makePoints('gEmpires','empire',popdata.pop,function () { return 3; },function (empire) { return map._empires[empire.data.eid].color; });

  var sizes = ["Villages","Towns","Cities","Large City","Metropolis"];

	$('path.hex').tooltipsy({
		content: function(cell) {
			var data = cell[0].__data__.data;
			var html="<strong>"+TERRAIN[data.terrain].name+" ("+CLIMATE[data.climate].name+")</strong>";

			if(typeof data.pop !== "undefined"){
        html+="</br>"+sizes[data.pop.size-1];
			}

      if(typeof data.site !== "undefined"){
        var site = data.site;
        html+="</br>"+site.tags[0]
        html+="</br>"+site.tags[1]
      }

      if(typeof data.ruin !== "undefined"){
        var ruin = data.ruin;
        html+="</br><strong>"+ruin.race+" Ruin</strong>";
        html+="</br>"+ruin.tags[0]+" ("+ruin.size+")";
      }

      html+="</br>"+data.tags.join(" ,");

			return html;
		}
	});

}
