const admin = require('firebase-admin');
const db = admin.database();
const gameHistoryRef = db.ref('gameLog');

module.exports = {
  log: (gameId, log) => {
    return gameHistoryRef.child(gameId).push(log);
  },
  getCurrUnixTime: () => {
    return Math.floor((new Date().getTime()) / 1000);
  }
}
