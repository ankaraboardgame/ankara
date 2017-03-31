const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const usersRef = db.ref('users');
const roomsRef = db.ref('rooms');

const Game = require('../../game/logic.js');
const router = module.exports = require('express').Router();

/** Game Logging */
const util = require('../util');
const log = util.log;

/**
 * Game routes for initializing game
 * ...api/game...
 */

// initialize new game
router.post('/:roomId', (req, res, next) => {
  const roomId = req.params.roomId;
  const usersMap = req.body.usersMap;
  const userId = req.body.userId;
  console.log(roomId, usersMap, userId);
  gamesRef.child(roomId).set(new Game(roomId, usersMap))
  .then(() => {
    roomsRef.child(roomId).remove();
    usersRef.child(userId).set({
      game: roomId,
      name: usersMap[userId]
    });
    res.sendStatus(204);
  })
  .then(() => {
    //game log
    log(roomId, {
      type: 'GAME_JOIN',
      user: userId,
      text: `${usersMap[userId]} joined the game`,
      timestamp: admin.database.ServerValue.TIMESTAMP
    });
  })
  .catch(next);
});

// load specific game
router.param('gameId', (req, res, next, gameId) => {
  req.gameRef = gamesRef.child(gameId);
  gamesRef.child(gameId).once('value', function(snap){
    return snap;
  }).then(snapshot => {
    req.game = snapshot.val();
    next();
  })
});

// end one specific game
router.post('/:gameId/end', (req, res, next) => {
  res.send(req.game);
});

// player-specific routes
router.use('/:gameId/player', require('./player.js'));
