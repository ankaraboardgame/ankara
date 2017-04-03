const admin = require('firebase-admin');

/** Game Logging */
const util = require('../util');
const log = util.log;

const router = module.exports = require('express').Router();

/**
 * Move routes
 * ...api/game/:gameId/player/:playerId/move/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

router.post('/', (req, res, next) => {
  req.playerRef.child('position').set({
    coordinates: req.body.newPosition,
    possibleMoves: req.body.possibleMoves
  })
  .then(() => {
    res.sendStatus(204);
    //game log
    log(req.game.id, {
      type: 'PLAYER_MOVE',
      user: req.player.id,
      location: req.body.newPosition,
      timestamp: admin.database.ServerValue.TIMESTAMP
    })
  })
  .catch(next);
});
