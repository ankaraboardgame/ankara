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
router.post('/market/:marketSize/:playerId/:fabricNum/:fruitNum/:jewelryNum/:spiceNum', (req, res, next) => {
  let marketSize = req.params.marketSize
  let tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, jewelry: req.params.jewelryNum, spice: req.params.spiceNum };
  let largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  let smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketGoods, sum = 0, transaction;
  gamesRef.child('gameOne')
    .child(`${marketSize}/demandTile`)
    .once('value', snap => {
      marketGoods = snap.val()
    })
    .then(() => {
      gamesRef.child('gameOne')
        .child(`merchants/${playerId}/wheelbarrow`)
        .once('value', snap => {
          transaction = snap.val()
        })
        .then(() => {
          for(let good in tradeOffer){
            if(marketGoods[good] > 0){
              if(tradeOffer[good] <= marketGoods[good]){
                sum += tradeOffer[good]
                transaction[good] -= tradeOffer[good]
              }
              else {
                sum += marketGoods[good]
                transaction -= marketGoods[good]
              }
            }
          }
          marketSize === 'smallMarket' ? transaction.money = smallMarketRate[sum] : transaction.money = largeMarketRate[sum];
          gamesRef.child('gameOne')
            .child(`merchants/${playerId}/wheelbarrow`)
            .set(transaction)
        })
        .then(() => {
          res.sendStatus(204)
        })
    })
    .catch(console.error)
})

