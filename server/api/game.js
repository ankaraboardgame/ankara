const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const usersRef = db.ref('users');
const roomsRef = db.ref('rooms');

const Promise = require('bluebird');

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
    req.game = snap.val();
    next();
  });
});

// signal the last round for a game
router.post('/:gameId/lastRound', (req, res, next) => {
  req.gameRef.update({lastRound: true})
  .then(() => res.sendStatus(204))
  .catch(next);
});

// end one specific game
router.post('/:gameId/end', (req, res, next) => {
  const userId = req.body.userId;
  const gameId = req.params.gameId;
  let leftCount;
  // disassociate player from game
  const promiseToLeave = usersRef.child(userId).child('game').remove();
  // record in the game that the player has left
  const promiseToRecord = gamesRef.child(gameId).child('left')
                          .transaction(count => {
                            leftCount = ++count;
                            return leftCount;
                          });
  Promise.all([promiseToLeave, promiseToRecord])
  .then(() => {
    // if all players have left, delete this game
    if (leftCount >= Object.keys(req.game.playerMap).length){
      gamesRef.child(gameId).remove();
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

// player-specific routes
router.use('/:gameId/player', require('./player.js'));
