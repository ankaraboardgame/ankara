const router = require('express').Router();
const firebaseAdmin = require('firebase-admin');
module.exports = router;

const firebaseDatabase = firebaseAdmin.database();
router.put('/', (req, res, next) => {
  const playerId = req.playerId;
  firebaseDatabase.ref(`games/gameOne/merchants/${playerId}/position`).set({
    coordinates: req.body.newPosition,
    possibleMoves: req.body.possibleMoves
  })
    .then(() => {
      res.sendStatus(203);
    })
    .catch(next);
});
