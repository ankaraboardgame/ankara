const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/** Game Logging */
const util = require('../util');
const log = util.log;
const getCurrUnixTime = util.getCurrUnixTime;

/**
 * Player routes
 * ...api/game/:gameId/player/...
 *
 * pre-loaded:
 * req.game = holds current game info
 */

// load one player
router.param('playerId', (req, res, next, playerId) => {
  req.player = req.game.merchants[playerId];
  next();
});

// end player turn
router.post('/:playerId/end', (req, res, next) => {
  const newIdx = (req.game.playerIds.indexOf(req.game.playerTurn) + 1) % req.game.playerIds.length;
  gamesRef.child(req.game.id)
    .child('playerTurn')
    .set(req.game.playerIds[newIdx])
    .then(() => {
      res.sendStatus(204);
      //game log
      const newPlayerId = req.game.playerIds[newIdx];
      log(req.game.id, {
        type: 'TURN',
        user: newPlayerId,
        timestamp: getCurrUnixTime()
      })

    })
    .catch(next);
});

// register player win
router.post('/:playerId/win', (req, res, next) => {
  const playerId = req.params.playerId;
  gamesRef.child(req.game.id)
    .child('winner')
    .set({[playerId]: req.game.playerMap[playerId]})
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

// SUBROUTES: player moves
router.use('/:playerId/move', require('./move.js'));

// SUBROUTES: player encounters with other merchants or smuggler
router.use('/:playerId/encounter', require('./encounter.js'));

// SUBROUTES: player stops on a location
router.use('/:playerId/location', require('./location.js'));

// SUBROUTES: player picks up / drops assistant on a location
router.use('/:playerId/assistant', require('./assistant.js'));

// SUBROUTES: player uses a bonus card or mosque tile ability
router.use('/:playerId/bonus', require('./bonus.js'));
