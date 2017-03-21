const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const gameCountRef = db.ref('gameCount');
const sessionRef = db.ref('session');

const Game = require('../../game/logic.js');
const router = module.exports = require('express').Router();

/**
 * Game routes for initializing game
 * ...api/game/...
 */

// initialize new game
router.post('/:roomNum', (req, res, next) => {

  //expects room number?
  const roomNum = req.params.roomNum;

  const playersPromise = sessionRef.child('rooms').child(roomNum).once('value')
  .then(snapshot => {
    console.log('players', snapshot.val());
    return snapshot.val();
  })
  .then(players => {
    //console.log('gameCount', gameCount, players);
    const gameId = roomNum; //room numbber becomes gameId

    // const incrementGameCountPromise = gameCountRef.set(gameCount + 1);
    //const setGameIdPromise = sessionRef.child('rooms').child(roomNum).child('gameId').set(gameId);
    return gamesRef.child(gameId).set(new Game(Object.values(players)));
  })
  .then(() => {
    res.sendStatu(204);
  })
  .catch(console.error);

  // gameCountRef.once("value", snapshot => {

  //   const gameCount = snapshot.val();
  //   //get uid of all players
  //   return sessionRef.child('connectedPlayers').once('value', snapshot => {
  //     return snapshot;
  //   }).then(data => {
  //     console.log('data', data.val());
  //     const playerIds = Object.keys(data.val());
  //     console.log('players', playerIds);
  //     return playerIds;
  //   }).then(playerIds => {
  //     console.log('got playerids', playerIds);
  //     console.log('game count', gameCount);
  //     const gameId = `game${gameCount}`;
  //     res.json({gameId});
  //     sessionRef.child('rooms').child(/*room number*/).child('gameId').set(gameId);
  //     return gamesRef.child(gameId).set(new Game(playerIds));
  //   }).then(() => {
  //     return gameCountRef.set(gameCount + 1);

  //   }).catch(console.error);

  // }).catch(console.error);

});

// load specific game
router.param('gameId', (req, res, next) => {
  gamesRef.child('gameOne').once('value', function(snap){
    return snap;
  }).then(snapshot => {
    req.game = snapshot.val();
    next();
  })
});

// get one specific game
router.get('/:gameId', (req, res, next) => {
  res.send(req.game);
});

// player-specific routes
router.use('/:gameId/player', require('./player.js'));
