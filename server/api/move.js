const router = require('express').Router();
const firebaseAdmin = require('firebase-admin');
module.exports = router;

const firebaseDatabase = firebaseAdmin.database();
router.put('/move/:locationId', (req, res, next) => {
  const playerId = req.params.playerId;
  const locationId = req.params.locationId;
  firebaseDatabase.ref('games/game_one/players' + playerId).set({position: locationId })
    .then(() => {
      res.send(playerId, 'has been set');
    })
    .catch(next);
});
