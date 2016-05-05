CPX.activeRealm = function (uid) {
  var map = cpxActive.realms[uid];
  //Increase the time by the next time
  map.addTime(30);
}
