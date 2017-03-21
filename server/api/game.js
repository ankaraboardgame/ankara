const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const gameCountRef = db.ref('gameCount');
const sessionRef = db.ref('session');

const Game = require('../../game/logic.js');
const router = module.exports = require('express').Router();

/**
 * Game routes for initializing game
 * ...api/game...
 */

// initialize new game
router.post('/:roomNum', (req, res, next) => {

  //expects room number?
  const roomNum = req.params.roomNum;
  const ids = req.body.ids;

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
    return gamesRef.child(gameId).set(new Game(ids));
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(console.error);

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
