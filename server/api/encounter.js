const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const router = module.exports = require('express').Router();

/**
 * Payment routes
 * ...api/game/:gameId/player/:playerId/encounter/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this router
 */

// pay other merchant
router.post('/:otherMerchantId', (req, res, next) => {
  const PAYMENT = 2;

  const payPromise = gamesRef.child('gameOne')
    .child(`merchants/${req.player.id}/money`)
    .transaction(function(currentMoney){
      return currentMoney - PAYMENT;
    });

  const getPaidPromise = gamesRef.child('gameOne')
    .child(`merchants/${req.player.id}/money`)
    .transaction(function(currentMoney){
      return currentMoney + PAYMENT;
    });

  Promise.all([payPromise, getPaidPromise])
  .then(() => {
    res.sendStatus(204);
  })
  .catch(console.error);
});
