const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const router = module.exports = require('express').Router();
/**
 * Location routes
 * ...api/game/:gameId/player/:playerId/location/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this route
 */

// 1. WAINWRIGHT (1) - pay wainwright and gain cart size
router.post('/wainwright', (req, res, next) => {
  const WAINWRIGHT_PRICE = 7;

  const payWainwrightPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/money`)
    .transaction(function(currentMoney){
      return currentMoney - WAINWRIGHT_PRICE;
    })

  const expandWheelbarrowPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/size`)
    .transaction(function(wheelbarrowSize){
      return wheelbarrowSize + 1;
    })

  Promise.all([payWainwrightPromise, expandWheelbarrowPromise])
})

 // 2. WAREHOUSES (3) - Depending on the goodType, player will get max amount
router.post('/warehouse/:goodType', (req, res, next) => {
  const playerId = req.player.id;
  const goodType = req.params.goodType;
  let WB_SIZE;
  gamesRef.child(req.game.id)
    .child(`merchants/${playerId}/wheelbarrow/size`)
    .once('value', snap => {
      WB_SIZE = snap.val()
    })
    .then(() => {
      return gamesRef.child(req.game.id)
        .child(`merchants/${playerId}/wheelbarrow/${goodType}`)
        .set(WB_SIZE)
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(console.error)
})

// 3. GEMSTONE DEALER (1) - pay gemstone dealer and gain ruby
router.post('/gemstonedealer', (req, res, next) => {
  let GEMSTONE_PRICE;

  gamesRef.child(req.game.id)
    .child('gemstoneDealer')
    .once('value', function(snap){
      GEMSTONE_PRICE = snap.val();
    })
    .then(() => {
      const payDealerPromise = gamesRef.child(req.game.id)
          .child(`merchants/${req.player.id}/wheelbarrow/money`)
          .transaction(function(currentMoney){
            return currentMoney - GEMSTONE_PRICE;
          });
      const acquireRuby = gamesRef.child(req.game.id)
          .child(`merchants/${req.player.id}/wheelbarrow/ruby`)
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

// 4. MARKETS (2) - Trade
router.post('/market/:marketSize/:fabricNum/:fruitNum/:jewelryNum/:spiceNum', (req, res, next) => {
  let marketSize = req.params.marketSize
  let tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, jewelry: req.params.jewelryNum, spice: req.params.spiceNum };
  let largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  let smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketGoods, sum = 0, transaction;
  gamesRef.child(req.game.id)
    .child(`${marketSize}/demandTile`)
    .once('value', snap => {
      marketGoods = snap.val()
    })
    .then(() => {
      gamesRef.child(req.game.id)
        .child(`merchants/${req.player.id}/wheelbarrow`)
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
          gamesRef.child(req.game.id)
            .child(`merchants/${req.player.id}/wheelbarrow`)
            .set(transaction)
        })
        .then(() => {
          res.sendStatus(204)
        })
    })
    .catch(console.error)
})

// 5. MOSQUES (2)
router.post('/mosque/:mosqueSize/:selectedTile', (req, res, next) => {
  // small mosque: left - fabric, right - fruit
  // large mosque: left - spice, right - jewelry
  const mosque = req.params.mosqueSize;
  const tile = req.params.selectedTile;
  let good, abilities, ability;

  if(mosque === 'smallMosque') {
    if(tile === 'left') {
      good = 'fabric';
      ability = 'dieTurnOrRoll'; // only for tea house or black market
    }
    else {
      good = 'fruit';
      ability = '2LiraToReturn1Assistant';
    }
  }

  if(mosque === 'greatMosque') {
    if(tile === 'left') {
      good = 'spice';
      ability = '2LiraFor1AdditionalGood'; // only for warehouse
    }
    else {
      good = 'jewelry';
      ability = 'add1Assistant'; // max 1 time, 5 assistants total
    }
  }

  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/abilities`)
    .once('value', snap => {
      abilities = snap.val()
    })
    .then(() => {

      if(!abilities[ability]){
        abilities.ability = ability
      }

      const updateMosqueRate = gamesRef.child(req.game.id)
      .child(`${mosque}/${tile}`)
      .transaction(currentTileRate => {
        return currentTileRate++
      })

      const updatePlayerWheelbarrow = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/${good}`)
      .transaction(currentGood => {
        return currentGood--
      })

      const updatePlayerAbilities = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/abilities`)
      .set(abilities)

      Promise.all([updateMosqueRate, updatePlayerWheelbarrow, updatePlayerAbilities])
    })
    .catch(console.error)
})

// 6. BLACK MARKET (1)
router.post('/blackMarket/:selectedGood/:dice1/:dice2/', (req, res, next) => {
  const diceSum = req.params.dice1 + req.params.dice2;

  const updateGoodChosen = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/${req.params.selectedGood}`)
    .transaction(function(currentGood){
      return currentGood++;
    })

  const promiseForJewelry = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/jewelry`)
    .transaction(currentJewelry => {
      if (diceSum === 7 || diceSum === 8) return currentJewelry + 1;
      else if (diceSum === 9 || diceSum === 10) return currentJewelry + 2;
      else if (diceSum === 11 || diceSum === 12) return currentJewelry + 3;
      else return currentJewelry
    })

  Promise.all([updateGoodChosen, promiseForJewelry])
})

// 7. TEA HOUSE (1)
router.post('/teaHouse/:number/:dice1/:dice2', (req, res, next) => {
  let sum = req.params.dice1 + req.params.dice2;
  const number = req.params.number
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/money`)
    .transation(currentMoney => {
      if(number >= sum) return currentMoney + number
      else return currentMoney + 2
    })
    .catch(console.error)
})

// 8. CARAVANSARY (1) - +5 lira OR +1 good, random --- need to put the randomnization of bonus cards in the front-end
router.post('/caravansary/:type', (req, res, next) => {
  const type = req.params.type;
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/${type}`)
    .transaction(currentMoneyOrGood => {
      if (type === 'money') return currentMoneyOrGood + 5;
      else return currentMoneyOrGood + 1;
    })
})
