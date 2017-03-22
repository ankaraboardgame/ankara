const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

router.put('/', (req, res, next) => {
  const playerId = req.player.id;
  gamesRef.child(`gameOne/merchants/${playerId}/position`).set({
    coordinates: req.body.newPosition,
    possibleMoves: req.body.possibleMoves
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);

});
