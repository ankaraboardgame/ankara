const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const router = module.exports = require('express').Router();

/**
 * Payment routes
 * ...api/player/:gameId/:playerId/pay/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this router
 */

// pay gemstone dealer
router.post('/wainwright', (req, res, next) => {
  const WAINWRIGHT_PRICE = 7;

  const payWainwrightPromise = gamesRef.child('gameOne')
    .child(`merchants/${req.player.id}/money`)
    .transaction(function(currentMoney){
      return currentMoney - WAINWRIGHT_PRICE;
    })

  const expandWheelbarrowPromise = gamesRef.child('gameOne')
    .child(`merchants/${req.player.id}/wheelbarrowSize`)
    .transaction(function(wheelbarrowSize){
      return wheelbarrowSize + 1;
    })

  Promise.all([payWainwrightPromise, expandWheelbarrowPromise])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next)
});

// pay gemstone dealer
router.post('/gemstonedealer', (req, res, next) => {
  let GEMSTONE_PRICE;

  gamesRef.child('gameOne')
    .child('gemstoneDealer')
    .once('value', function(snap){
      GEMSTONE_PRICE = snap.val();
    })
    .then(() => {
      return gamesRef.child('gameOne')
          .child(`merchants/${req.player.id}/money`)
          .transaction(function(currentMoney){
            return currentMoney - GEMSTONE_PRICE;
          });
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next)
});

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
  .catch(next);
});
