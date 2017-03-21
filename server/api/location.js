const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const router = module.exports = require('express').Router();

/**
 * Location routes
 * ...api/player/:gameId/:playerId/location/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this route
 */

// pay wainwright and gain cart size
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
    .catch(console.error)
});

// pay gemstone dealer and gain ruby
router.post('/gemstonedealer', (req, res, next) => {
  let GEMSTONE_PRICE;

  gamesRef.child('gameOne')
    .child('gemstoneDealer')
    .once('value', function(snap){
      GEMSTONE_PRICE = snap.val();
    })
    .then(() => {
      const payDealerPromise = gamesRef.child('gameOne')
          .child(`merchants/${req.player.id}/money`)
          .transaction(function(currentMoney){
            return currentMoney - GEMSTONE_PRICE;
          });
      const acquireRuby = gamesRef.child('gameOne')
          .child(`merchants/${req.player.id}/rubies`)
          .transaction(function(currentRubies){
            return currentRubies + 1;
          });
      return Promise.all([payDealerPromise, acquireRuby]);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(console.error)
});
