const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Player routes
 * ...api/game/:gameId/player/...
 *
 * pre-loaded:
 * req.game = holds current game info
 */

// get all players
router.get('/', (req, res, next) => {
  res.send(req.game.merchants);
});

// load one player
router.param(':playerId', (req, res, next, playerId) => {
  req.player = req.game.merchants[playerId];
  next();
});

// get one player
router.get('/:playerId', (req, res, next) => {
  res.send(req.player);
});

// end player turn
router.post('/:playerId/end', (req, res, next) => {
  const newIdx = (req.game.playerIds.indexOf(req.game.playerTurn) + 1) % req.game.playerIds.length;
  gamesRef.child('gameOne')
    .child('playerTurn')
    .set(req.game.playerIds[newIdx])
    .then(() => {
      res.sendStatus(204);
    })
});

// all player payments
router.use('/:playerId/pay', require('./pay.js'));
