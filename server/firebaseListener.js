const admin = require('firebase-admin');
const db = admin.database();
const sessionRef = db.ref('session');
const gamesRef = db.ref('games');
const Game = require('../game/logic');

const addFirebaseListener = function() {

  let ref = db.ref("/session/connectedPlayers");
  ref.on("value", function(snapshot, prevChildKey) {
    const value = snapshot.val();
    console.log('players in game', Object.keys(value).length);

    ref = db.ref('/session');
    if (Object.keys(value).length === 4) {
      //Update session status to full and inGame
      ref.update({full: true, inGame: true});
      //Create game
      gamesRef.child('gameTwo').set(new Game([...Object.keys(value)]))
      //
    } else {
      ref.update({full: false});
    }

    console.log('on connectedPlayers changed', snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}

module.exports = addFirebaseListener;
