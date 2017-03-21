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

 // Warehouse - Depending on the goodType, player will get max amount
router.post('/warehouse/:playerId/:goodType', (req, res, next) => {
  const playerId = req.params.playerId;
  const goodType = req.params.goodType;
  let WB_SIZE;
  gamesRef.child('gameOne')
    .child(`merchants/${playerId}/wheelbarrowSize`)
    .once('value', snap => {
      WB_SIZE = snap.val()
    })
    .then(() => {
      return gamesRef.child('gameOne')
        .child(`merchants/${playerId}/${goodType}`)
        .set(WB_SIZE)
    })
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
})

// Small Market - Trade
router.post('/smallMarket/:playerId/tradeOffer', (req, res, next) => {
  const tradeOffer = req.body.tradeOffer
  console.log(tradeOffer)
})

