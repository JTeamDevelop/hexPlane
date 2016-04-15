//doom function, gives the current doom level d, and the nature of the doom - what is its goal
hexPlaneMap.prototype.makeDoom = function (cell,location) {
  this.cells[cell].tags.push("Doom");
  var agenda = ["Conquer","Destroy","Subvert","Amass"];
  var uid = makeUID(6,this.RNG);
  this._doom[uid] = {agenda:agenda.random(this.RNG),cell:cell,cradle:location};
}
hexPlaneMap.prototype.doomCheckWithin = function (cid) {
}
hexPlaneMap.prototype.doomArray = function () {
  var dA = [];
  for (var x in this._doom){
    dA.push(x);
  }
  return dA;
}
hexPlaneMap.prototype.doomSelect = function () {
  var Doom = this._doom[this.doomArray().random(this.RNG)];

  var armies = ["Horde","ORganization","Scourge","Titan"];
  Doom.armies = [armies.random(this.RNG)];

  //sieze a Power, Destroy a community
  var plans = [{stage:0,nature:"power"},{stage:0,nature:"destroy"}];

}
