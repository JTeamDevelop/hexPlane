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

//makes a unique id for various objects that is n characters long
makeUID = function (n) {
	n = typeof n === "undefined" ? 24 : n;
	var text = "";
	var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

	for( var i=0; i < n; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

   	return text;
};

RNG = function(seed){
	this.seedrnd = typeof seed === "undefined" ? Math.random : new xor4096(seed);
	this.random=this.seedrnd;

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
RNG.prototype.FateRoll = function (){ return this.multiRoll (1, 3, 4)-8; }
RNG.prototype.rndArray = function (array) {
	if (!array.length) { return null; }
	return array[Math.floor(this.RND() * array.length)];
}
// @returns {array} New array with randomized items
RNG.prototype.shuffleAr = function (array) {
  	var currentIndex = array.length, temporaryValue, randomIndex ;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(this.seedrnd() * currentIndex);
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

String.prototype.capFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.remove = function (item) {
  var i = this.indexOf(item);
  this.splice(i,1);
}
Array.prototype.random = function (RNG) {
	RNG = typeof RNG === "undefined" ? Math : RNG;
  var i = RNG.random()*this.length;
  return this[Math.floor(i)];
}
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

function polygon(d) {
  return "M" + d.join("L") + "Z";
}
function line(d) {
  return "M" + d.join("L") + "Z";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

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
