const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Move routes
 * ...api/game/:gameId/player/:playerId/move/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this route
 */

router.post('/', (req, res, next) => {
  const playerId = req.player.id;
  const gameId = req.game.id
  gamesRef.child(`${gameId}/merchants/${playerId}/position`).set({
    coordinates: req.body.newPosition,
    possibleMoves: req.body.possibleMoves
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});
