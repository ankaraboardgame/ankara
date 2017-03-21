const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const router = module.exports = require('express').Router();
/**
 * Location routes
 * ...api/location/...
 */

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
