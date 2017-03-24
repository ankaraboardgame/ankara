const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Assistant routes
 * ...api/game/:gameId/player/:playerId/assistant...
 *
 * pre-loaded:
 * req.game = holds current game data
 * req.player = holds player data
 */

/**
 * Drop off assistant
 * example req.body: { coordinates: "0,1" }
 */
router.post('/drop', (req, res, next) => {
  const coords = req.body.coordinates;
  const assistantsRef = gamesRef
    .child(`${req.game.id}/merchants/${req.player.id}/assistants`);

  assistantsRef
    .child('count')
    .transaction(currCount => --currCount)
    .then(() => {
      return assistantsRef.child('out').push(coords);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

/**
 * Pickup assistant
 * example req.body: { coordinates: "0,1" }
 */
router.post('/pickup', (req, res, next) => {
  console.log(req.player);
  const coords = req.body.coordinates;
  const assistantsRef = gamesRef
    .child(`${req.game.id}/merchants/${req.player.id}/assistants`);

  assistantsRef
    .child('count')
    .transaction(currCount => ++currCount)
    .then(() => {
      const assistantsOut = req.player.assistants.out;
      for (let key in assistantsOut){
        if (assistantsOut[key] === coords){
          delete assistantsOut[key];
        }
      }
      assistantsRef.child('out').set(assistantsOut);
    })
    .then(() => {
      res.send(req.player);
    })
    .catch(next);
});

