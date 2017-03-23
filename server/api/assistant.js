const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Assistant routes
 * ...api/game/:gameId/player/assistant...
 *
 * pre-loaded:
 * req.game = holds current game data
 * req.player = holds player data
 * req.merchantRef = holds firebase ref to merchant (player)
 */

// drop off assistant
router.post('/:coords', (req, res, next, playerId) => {
  req.playerRef
});

// pick assistant
router.post('/:coords', (req, res, next, playerId) => {});

