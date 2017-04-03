const router = module.exports = require('express').Router();

/**
 * Assistant routes
 * ...api/game/:gameId/player/:playerId/assistant...
 *
 * pre-loaded:
 * req.params = { playerId, gameId }
 * req.game = specific game instance
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

/**
 * Drop off assistant
 * example req.body: { coordinates: "0,1" }
 */
router.post('/drop', (req, res, next) => {
  const coords = req.body.coordinates;
  const assistantsRef = req.playerRef.child('assistants');
  assistantsRef.child('count')
    .transaction(count => {
      if (count === null) count = 4;
      if (count < 1) throw new Error('Attempted to drop assistant when none left.')
      return --count;
    })
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
  const coords = req.body.coordinates;
  const assistantsRef = req.playerRef.child('assistants');

  assistantsRef.child('count')
    .transaction(count => ++count)
    .then(() => {
      const assistantsOut = req.player.assistants.out;
      for (let key in assistantsOut){
        if (assistantsOut[key] === coords){
          delete assistantsOut[key];
        }
      }
      return assistantsRef.child('out').set(assistantsOut);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

