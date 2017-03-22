const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

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
