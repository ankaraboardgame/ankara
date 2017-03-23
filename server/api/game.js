const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const gameCountRef = db.ref('gameCount');
const sessionRef = db.ref('session');
const usersRef = db.ref('users');

const Game = require('../../game/logic.js');
const router = module.exports = require('express').Router();

/**
 * Game routes for initializing game
 * ...api/game...
 */

// initialize new game
router.post('/:roomId', (req, res, next) => {
  const roomId = req.params.roomId;
  const ids = req.body.ids;
  gamesRef.child(roomId).set(new Game(roomId, ids))
    .then(() => {
      ids.forEach((id) => {
        usersRef.child(id).set(roomId);
      });
  })

  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

// load specific game
router.param('gameId', (req, res, next, gameId) => {
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
