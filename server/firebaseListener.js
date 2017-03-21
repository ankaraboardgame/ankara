const admin = require('firebase-admin');
const db = admin.database();
const sessionRef = db.ref('session');
const gamesRef = db.ref('games');

const addFirebaseListener = function() {
  console.log('addFBListenering');
  let ref = db.ref("/session/connectedPlayers");
  ref.on("value", function(snapshot, prevChildKey) {
    const value = snapshot.val();
    console.log('players in game', Object.keys(value).length);

    ref = db.ref('/session');
    if (Object.keys(value).length > 3) {
      ref.update({full: true});
    } else {
      ref.update({full: false});
    }

    console.log('on connectedPlayers changed', snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

module.exports = addFirebaseListener;
