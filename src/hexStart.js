var n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Welcome to hexPlane!'});
var n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Generating terrain.'});
var map = new hexPlaneMap();
setTimeout(function(){
  map.random({display:true});
  var n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Populating.'});
}, 1000);

setTimeout(function(){
  map.populate();
  console.log(map);

  map.heroRandomGen();
  var panZoomHex = svgPanZoom('#hexSVG');
}, 5000);
