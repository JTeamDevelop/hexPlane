var n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Welcome to hexPlane!'});
var map = new hexPlaneMap();
map.random();
map.display();

setTimeout(function(){
  var n = noty({layout: 'center', type: 'success', timeout: 500, text: 'Populating.'});
  map.populate();
}, 1000);

console.log(map);
