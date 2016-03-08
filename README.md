# hexPlane
JS framework to display randomly generated hex map using D3

*This is free because the grace of God is free through His son Jesus.*

The map creates a number of random zones that each contain a number of random hex cells. This is meant to vary roughly simulate different terrains. But the map has a lot of parameters that can be modified to change functionality.

**This is a complete and functioning project.**
You can try it out: http://jteamdevelop.github.io/hexPlane

Just include D3 and the hexPlane.js file in your html:
```
  <script type="text/javascript" src="src/d3.min.js"></script>
  <script type="text/javascript" src="src/hexPlane.js"></script>
```
  
To create an empty map:
```
  var map = new hexPlaneMap();
```
  
To make a random map with default parameters:
```
  map.random();
```
  
Finally you must display the map:
```
  map.display();
```
  
You can change the map's default parameters:
* map._width = the width of the SVG display in pixels (1200 is default)
* map._height = the height of the SVG display in pixels (800 is default)
* map._hexSize = the size of the individual hexes in pixels (10 is default)

If using random to generate a map it has the following parameters that may be set:
* map._min = Minimum nuber of hexes to generate (1000 is default) 
* map._max = Maximum number of hexes to generate (4000 is default)
* map._bias = The number of cells the random call with center around modified by influence (2000 is default)
* map._influence = A number between 0 and 1 that indicates how strong the bias is (1 by default)

A hexPlaneMap object has the following values:
* _actualC = The actuall cell count
* _rndC = The randomly generated cell count
* cells = An object containing all of the HCell objects - their ids are "x,y"
* zones = An array of all the different Zone objects created
