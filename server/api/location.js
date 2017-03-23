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
  .then(() => { res.sendStatus(204); })
  .catch(next);
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
    .catch(next)
})

// 3. GEMSTONE DEALER (1) - pay gemstone dealer and gain ruby
router.post('/gemstonedealer', (req, res, next) => {
  let GEMSTONE_PRICE;

  gamesRef.child(req.game.id)
    .child('gemstoneDealer')
    .transaction(currPrice => {
      GEMSTONE_PRICE = currPrice;
      return ++currPrice;
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
    .catch(next)
});

// 4. MARKETS (2) - Trade
router.post('/market/:marketSize/:fabricNum/:fruitNum/:jewelryNum/:spiceNum', (req, res, next) => {
  let marketSize = req.params.marketSize
  let tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, jewelry: req.params.jewelryNum, spice: req.params.spiceNum };
  let largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  let smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketDemand, sum = 0, transaction;

  gamesRef.child(req.game.id)
    .child(`${marketSize}/demandTile`)
    .once('value', snap => {
      marketDemand = snap.val()
    })
    .then(() => {
      gamesRef.child(req.game.id)
        .child(`merchants/${req.player.id}/wheelbarrow`)
        .once('value', snap => {
          transaction = snap.val()
        })
        .then(() => {
          for(let good in tradeOffer){
            if(marketDemand[good] > 0){
              if(tradeOffer[good] <= marketDemand[good]){
                sum += tradeOffer[good]
                transaction[good] -= tradeOffer[good]
              }
            }
          }
          transaction.money += (marketSize === 'smallMarket') ? smallMarketRate[sum] : largeMarketRate[sum];
          return gamesRef.child(req.game.id)
            .child(`merchants/${req.player.id}/wheelbarrow`)
            .set(transaction)
        })
        .then(() => {
          res.sendStatus(204)
        })
    })
    .catch(next)
})

// 5. MOSQUES (2)
router.post('/mosque/:mosqueSize/:tileChosen', (req, res, next) => {
  // small mosque: left - fabric, right - fruit
  // large mosque: left - spice, right - jewelry
  const mosque = req.params.mosqueSize;
  const tile = req.params.tileChosen;
  let good, abilities, ability;

  if (mosque === 'smallMosque') {
    if (tile === 'left') {
      good = 'fabric';
      ability = 'dieTurnOrRoll'; // only for tea house or black market
    } else {
      good = 'fruit';
      ability = '2LiraToReturn1Assistant';
    }
  }

  if (mosque === 'greatMosque') {
    if (tile === 'left') {
      good = 'spice';
      ability = '2LiraFor1AdditionalGood'; // only for warehouse
    } else {
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

      if (!abilities[ability]){
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

      return Promise.all([updateMosqueRate, updatePlayerWheelbarrow, updatePlayerAbilities])
    })
    .then(() => { res.sendStatus(204); })
    .catch(next)
})

// 6. BLACK MARKET (1)
router.post('/blackMarket/:goodChosen/:diceRoll/', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;

  const updateGoodPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/${req.params.goodChosen}`)
    .transaction(function(currentGood){
      return currentGood + 1;
    })

  const updateHeirloomPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/jewelry`)
    .transaction(currentJewelry => {
      if (diceRoll === 7 || diceRoll === 8) return currentJewelry + 1;
      else if (diceRoll === 9 || diceRoll === 10) return currentJewelry + 2;
      else if (diceRoll === 11 || diceRoll === 12) return currentJewelry + 3;
      else return currentJewelry;
    })

  Promise.all([updateGoodPromise, updateHeirloomPromise])
    .then(() => { res.sendStatus(204); })
    .catch(next);
})

// 7. TEA HOUSE (1)
router.post('/teaHouse/:gamble/:diceRoll', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;
  const gamble = +req.params.gamble
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/money`)
    .transaction(currentMoney => {
      if (diceRoll >= gamble) return currentMoney + gamble;
      else return currentMoney + 2;
    })
    .then(() => { res.sendStatus(204); })
    .catch(next);
})

// 8. CARAVANSARY (1)
router.post('/caravansary/:type', (req, res, next) => {
  const type = req.params.type;
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/${type}`)
    .transaction(currentMoneyOrGood => {
      if (type === 'money') return currentMoneyOrGood + 5;
      else return currentMoneyOrGood + 1;
    })
    .then(() => { res.sendStatus(204); })
    .catch(next);
})
