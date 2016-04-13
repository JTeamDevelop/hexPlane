CPX = {};

//RNG function - based on seedrandom.js for repeatability and it uses xor4096 for extensive period
RNG = function(seed){
	this.seedrnd = typeof seed === "undefined" ? new xor4096(Math.random()) : new xor4096(seed);
  //uses double to get 56 bits of randomness - will slow it down a little
	this.random=this.seedrnd.double;
};
RNG.prototype.rndInt = function (min, max) {
    return Number(Math.floor(this.seedrnd() * (max - min + 1)) + min);
}
RNG.prototype.multiRoll = function (min, max, num) {
    var x=0;
	for(var i=0;i<num;i++){
		x+=this.rndInt(min, max);
	}
    return x;
}
RNG.prototype.TrueFalse = function (){
  if (this.random()>.5) {
    return true;
  }
  else {
    return false;
  }
}
RNG.prototype.FateRoll = function (){ return this.multiRoll (1, 3, 4)-8; }
RNG.prototype.rndName = function () {
    return NameGenerator(this);
}
RNG.prototype.rndColor = function () {
  var R = this;
  function randHex() {
      return (Math.floor(R.random() * 206) + 50).toString(16);
  }
  return randHex() + "" + randHex() + "" + randHex();
}
RNG.prototype.rndArray = function (array) {
	if (!array.length) { return null; }
	return array[Math.floor(this.random() * array.length)];
}
// @returns {array} New array with randomized items
RNG.prototype.shuffleAr = function (array) {
  	var currentIndex = array.length, temporaryValue, randomIndex ;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(this.random() * currentIndex);
    	currentIndex -= 1;

    	// And swap it with the current element.
    	temporaryValue = array[currentIndex];
    	array[currentIndex] = array[randomIndex];
    	array[randomIndex] = temporaryValue;
  	}

  	return array;
}
//random value map - min & max bound all ponts
//bias is the most likely value, influence is between 0 & 1 and refelcts how strong bias will be
RNG.prototype.RNDBias = function (min, max, bias, influence) {
    var rnd = this.random() * (max - min) + min,   // random in range
        mix = this.random() * influence;           // random mixer
    return rnd * (1 - mix) + bias * mix;           // mix full range and bias
}
// Global RNG to use with a Math.Random seed
xorRNG = new RNG();
///////////////////////////////////////////////////////////////////////////////////////////////
//makes a unique id for various objects that is n characters long
makeUID = function (n,RNG) {
	n = typeof n === "undefined" ? 24 : n;
	RNG = typeof RNG === "undefined" ? xorRNG : RNG;
	var text = "";
	var possible = "ABCDEFGHIJKLMNPOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < n; i++ ){
		text += possible.charAt(Math.floor(RNG.random() * possible.length));
	}

   	return text;
};
///////////////////////////////////////////////////////////////////////////////////////////////
//Basic http asynchronous request
function httpGetAsync(theUrl, callback, rarity)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,rarity);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
///////////////////////////////////////////////////////////////////////////////////////////////
//Simple test to see if an object is defined = exists
objExists = function (obj) {
  if (typeof obj === "undefined") {
    return false;
  }
  else {
    return true;
  }
}
objArrayContains = function (objarray,key,data) {
	for (var x in objarray) {
		if(objExists(objarray[x].key)) {
			if(objarray[x].key == data) {
				return x;
			}
		}
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
//String helpers
String.prototype.capFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
///////////////////////////////////////////////////////////////////////////////////////////////
//Array helpers
//Find max and return it with index
Array.prototype.max = function () {
  var max = {i:0,val:this[0]};
  for(var i = 0; i < this.length; ++i){
    if(this[i]>max.val){
      max.val = this[i];
      max.i = i;
    }
  }
  return max;
};
//Find max with an array of objects
Array.prototype.objMax = function (key) {
  var max = {i:-1,val:this[0][key],obj:{}};
  for(var i = 0; i < this.length; ++i){
    if(this[i][key]>max.val){
      max.val = this[i][key];
      max.i = i;
      max.obj = this[i];
    }
  }
  return max;
};
//Count instances of item in array
Array.prototype.count = function (item) {
  var count = 0;
  for(var i = 0; i < this.length; ++i){
      if(this[i] == item){
        count++;
      }
  }
  return count;
};
//Does the item exist in an array
Array.prototype.contains = function (item) {
  if (this.indexOf(item)>-1) {
    return true;
  }
  else {
    return false;
  }
}
//Remove Item from array
Array.prototype.remove = function (item) {
  var i = this.indexOf(item);
  this.splice(i,1);
}
//Pick a random item from an array - provided RNG or ueses math.random if not fed
Array.prototype.random = function (RNG) {
	RNG = typeof RNG === "undefined" ? Math : RNG;
  var i = RNG.random()*this.length;
  return this[Math.floor(i)];
}
//Removes duplicates from array
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
///////////////////////////////////////////////////////////////////////////////////////////////
//SVG functions
//Builds polygon path given array of points [[x,y],[x,y],[x,y]]
function polygon(d) {
  return "M" + d.join("L") + "Z";
}
//Builds a line path given array of points [[x,y],[x,y]]
function line(d) {
  return "M" + d.join("L") + "Z";
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};
d3.selection.prototype.moveToBack = function() {
	return this.each(function() {
		var firstChild = this.parentNode.firstChild;
		if (firstChild) {
			this.parentNode.insertBefore(this, firstChild);
		}
	});
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//Name Gen functions

//More limited NameGen
function nameGen(RNG){
  RNG = typeof RNG === "undefined" ? Math : RNG;

  var nm1 = ["b","c","d","f","g","h","i","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z","","","","",""];
  var nm2 = ["a","e","o","u"];
  var nm3 = ["br","cr","dr","fr","gr","pr","str","tr","bl","cl","fl","gl","pl","sl","sc","sk","sm","sn","sp","st","sw","ch","sh","th","wh"];
  var nm4 = ["ae","ai","ao","au","a","ay","ea","ei","eo","eu","e","ey","ua","ue","ui","uo","u","uy","ia","ie","iu","io","iy","oa","oe","ou","oi","o","oy"];
  var nm5 = ["turn","ter","nus","rus","tania","hiri","hines","gawa","nides","carro","rilia","stea","lia","lea","ria","nov","phus","mia","nerth","wei","ruta","tov","zuno","vis","lara","nia","liv","tera","gantu","yama","tune","ter","nus","cury","bos","pra","thea","nope","tis","clite"];
  var nm6 = ["una","ion","iea","iri","illes","ides","agua","olla","inda","eshan","oria","ilia","erth","arth","orth","oth","illon","ichi","ov","arvis","ara","ars","yke","yria","onoe","ippe","osie","one","ore","ade","adus","urn","ypso","ora","iuq","orix","apus","ion","eon","eron","ao","omia"];
  var br = "";

  var i = RNG.random()*10, name="";
  i = Math.floor(i);

		if(i < 2){
			name = nm1.random(RNG) + nm2.random(RNG) + nm3.random(RNG) + nm4.random(RNG) + nm5.random(RNG);
		}else if(i < 4){
			name = nm1.random(RNG) + nm2.random(RNG) + nm3.random(RNG) + nm6.random(RNG);
		}else if(i < 6){
			name = nm1.random(RNG) + nm4.random(RNG) + nm5.random(RNG);
		}else if(i < 8){
			name = nm3.random(RNG) + nm2.random(RNG) + nm1.random(RNG) + nm2.random(RNG) + nm5.random(RNG);
		}else{
			name = nm3.random(RNG) + nm6.random(RNG);
		}

    return name;
}

//Extensive NameGen based upon Elite planet name gen
NameGenerator = function (RNG) {

    // Syllables shamelessly stolen from elite
    var syllables = 'folexegezacebisousesarmaindireaeratenberalavetiedorquanteisrion',
        vocals = 'aeiou';

    // Some improvements
    var vocalMustFollow = 'tdbr',
        notFollowdBySelf = 'rstie',
        onlyAtStart = 'xyz',
        badSoundStart = ['xc', 'rc', 'bf', 'qc', 'fc', 'vr', 'vc'],
        badSoundMiddle = ['eo', 'ou', 'ae', 'ea', 'sr', 'sg', 'sc', 'nv', 'ng', 'sb', 'sv'];

    function isValid(previous, next) {

        var pa = previous[0],
            pb = previous[1],
            na = next[0];

        if (
            // Block out eveything that's too similar by comparing the initial
            // characters
               (Math.abs(pa.charCodeAt(0) - na.charCodeAt(0)) === 1)

            // Prevent specific letter doubles in the middle of the "word"
            || (notFollowdBySelf.indexOf(pb) !== -1 && pb === na)

            // A vocal must follow the last character of the previous syllable
            || (vocalMustFollow.indexOf(pb) !== -1 && vocals.indexOf(na) === -1)

            // Block the second syllable in case it's initial character can only
            // occur at the start
            || (onlyAtStart.indexOf(na) !== -1)

            // Block other combinations which simply do not sound very well
            || (badSoundStart.indexOf(pa + na) !== -1)

            // Block other combinations which simply do not sound very well
            || (badSoundMiddle.indexOf(pb + na) !== -1)

            // Block double syllable pairs
            || (previous === next)) {

            return false;

        } else {
            return true;
        }

    }

    // Name generator
    var str = '',
        previous = null,
        next,
        syllableIndex = 0,
        l = [1,2,2,2,2,3,3,3,3,3,3,3,3,4,5];
        i = 0;

    l=l.random(RNG);
    while(i < l) {
      syllableIndex = RNG.rndInt(0,syllables.length-2);
      next = syllables.substr(syllableIndex, 2);

      if (!previous || isValid(previous, next)) {
        str += next;
        previous = next;
        i++;
      }
    }

    return str.capFirst();
};
