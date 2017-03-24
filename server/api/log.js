const admin = require('firebase-admin');
const db = admin.database();
const logRef = db.ref('gameHistory');

const util = require('../util');
const log = util.log;
const getCurrUnixTime = util.getCurrUnixTime;

const router = module.exports = require('express').Router();

/**
 * Log routes
 * ...api/game/:gameId/player/:playerId/log...
 *
 * pre-loaded:
 * req.game = holds current game info
 * req.player = holds current player/merchant info
 */

router.post('/', (req, res, next) => {
  const message = req.body.message;
  log(req.game.id, {
    text: `${req.game.playerMap[req.player.id]}: ${message}`,
    timestamp: getCurrUnixTime()
  })
  .then(() => {
    res.status(201)
  })

});
