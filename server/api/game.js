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
const getCurrUnixTime = util.getCurrUnixTime;

/**
 * Game routes for initializing game
 * ...api/game...
 */

// initialize new game
router.post('/:roomId', (req, res, next) => {
  const roomId = req.params.roomId;
  const usersMap = req.body.usersMap;
  gamesRef.child(roomId).set(new Game(roomId, usersMap))
  .then(() => {
    Object.keys(usersMap).forEach((userId) => {
      usersRef.child(userId).set({
        game: roomId,
        name: usersMap[userId]
      });
    });
  })
  .then(() => {
    roomsRef.child(roomId).remove();
  })
  .then(() => {
    res.sendStatus(204);
    //game log
    Object.keys(usersMap).map(userId => {
      log(roomId, {
        type: 'GAME_JOIN',
        user: userId,
        text: `${usersMap[userId]} joined the game`,
        timestamp: getCurrUnixTime()
      });
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

// get one specific game
router.get('/:gameId', (req, res, next) => {
  res.send(req.game);
});

// player-specific routes
router.use('/:gameId/player', require('./player.js'));
