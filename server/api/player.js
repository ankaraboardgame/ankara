const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const Game = require('./logic');

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
  console.log('one player', req.player);
  res.send(req.player);
});

// all player payments
router.use('/:playerId/pay', require('./pay.js'));
