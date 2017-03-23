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
router.post('/:coords', (req, res, next) => {
  const coords = req.params.coords;
  req.merchantRef.child('assistants').child('count')
    .transaction(currCount => --currCount)
    .then(() => {
      return req.merchantRef.child('assistants').child('out').push(coords);
    })
    .then(() => {
      res.sendStatus(204);
    })
});

// pick assistant
router.post('/:coords', (req, res, next, playerId) => {
  const coords = req.params.coords;
  req.merchantRef.child('assistants').child('count')
    .transaction(currCount => ++currCount)
    .then(() => {
      const remainingAssistantsOut = req.player.assistants.out;
      assistantsOut.filter(assistantCoords => {
        return assistantCoords !== coords;
      })
      req.merchantRef.child('assistants').child('out').set(remainingAssistantsOut);
    })
    .then(() => {
      res.sendStatus(204);
    })
});

