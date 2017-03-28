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
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

// 1. WAINWRIGHT (1) - pay wainwright and gain cart size
router.post('/wainwright', (req, res, next) => {
  const WAINWRIGHT_PRICE = 7;

  const payWainwrightPromise = req.playerRef
    .child('wheelbarrow/money')
    .transaction(money =>  money - WAINWRIGHT_PRICE);

  const expandWheelbarrowPromise = req.playerRef
    .child('wheelbarrow/size')
    .transaction(size => ++size);

  Promise.all([payWainwrightPromise, expandWheelbarrowPromise])
  .then(() => { res.sendStatus(204); })
  .catch(next);
})

router.post('/wainwright/earnRuby', (req, res, next) => {
  req.playerRef
    .child('wheelbarrow/ruby')
    .transaction(rubies => ++rubies);
})

 // 2. WAREHOUSES (3) - Depending on the goodType, player will get max amount
router.post('/warehouse/:goodType', (req, res, next) => {
  const goodType = req.params.goodType;
  let WB_SIZE;
  req.playerRef.child('wheelbarrow/size')
    .once('value', snap => {
      WB_SIZE = snap.val()
    })
    .then(() => {
      return req.playerRef
        .child(`wheelbarrow/${goodType}`)
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

  req.gameRef
    .child('gemstoneDealer')
    .transaction(currPrice => {
      GEMSTONE_PRICE = currPrice;
      return ++currPrice;
    })
    .then(() => {
      const payDealerPromise = req.playerRef
          .child('wheelbarrow/money')
          .transaction(money => money - GEMSTONE_PRICE);
      const acquireRuby = req.playerRef
          .child('wheelbarrow/ruby')
          .transaction(rubies => ++rubies);
      return Promise.all([payDealerPromise, acquireRuby]);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next)
});

// 4. MARKETS (2) - Trade
router.post('/market/:marketSize/:currentMarketIdx/:fabricNum/:fruitNum/:heirloomNum/:spiceNum', (req, res, next) => {
  const marketSize = req.params.marketSize;
  const currentMarketIdx = req.params.currentMarketIdx;
  const tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, heirloom: req.params.heirloomNum, spice: req.params.spiceNum };
  const largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  const smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketDemand, sum = 0, transaction;

  req.gameRef
    .child(`${marketSize}/demandTiles/${currentMarketIdx}`)
    .once('value', snap => {
      marketDemand = snap.val()
    })
    .then(() => {
      return req.playerRef
        .child('wheelbarrow')
        .once('value', snap => {
          transaction = snap.val()
        })
        .then(() => {
          for(let good in tradeOffer){
            if(marketDemand[good] > 0){
              if(tradeOffer[good] <= marketDemand[good]){
                sum += +tradeOffer[good]
                transaction[good] -= tradeOffer[good]
              }
            }
          }
          transaction.money = (marketSize === 'smallMarket') ? transaction.money + smallMarketRate[sum] : transaction.money + largeMarketRate[sum];
          return req.playerRef.child('wheelbarrow').set(transaction)
        })
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

router.post('/market/:marketSize/:currentMarketIdx/updateTile', (req, res, next) => {
  let nextMarketIdx = ++req.params.currentMarketIdx % 5
  req.gameRef
    .child(`${req.params.marketSize}/currentMarketIdx`)
    .set(nextMarketIdx)
    .then(() => res.sendStatus(204))
    .catch(next)
})

// 5. MOSQUES (2)
router.post('/mosque/:mosqueSize/:selectedTile', (req, res, next) => {
  // small mosque: fabric & spice
  // great mosque: heirloom & fruit
  const mosque = req.params.mosqueSize;
  const tile = req.params.selectedTile;
  let abilities, ability;

  if (mosque === 'smallMosque') {
    if (tile === 'fabric') {
      ability = 'dieTurnOrRoll'; // only for tea house or black market
    }
    if (tile === 'spice'){
      ability = '2LiraFor1Good'; // any warehouse
    }
  }

  if (mosque === 'greatMosque') {
    if (tile === 'heirloom') {
      ability = 'add1Assistant'; // can only be used once
    }
    if (tile === 'fruit'){
      ability = '2LiraToReturn1Assistant'; // only once in a turn
    }
  }

  req.playerRef
    .child('abilities')
    .once('value', snap => {
      abilities = snap.val()
    })
    .then(() => {

      if (!abilities[ability]){
        abilities[tile].acquired = true
      }

      const updateMosqueRate = req.gameRef
      .child(`${mosque}/${tile}`)
      .transaction(currentTileRate => {
        return ++currentTileRate
      })

      const updatePlayerWheelbarrow = req.playerRef
      .child('wheelbarrow')
      .child(tile)
      .transaction(good => --good);

      const updatePlayerAbilities = req.playerRef
      .child('abilities')
      .set(abilities)
      .then(() => {
        if(tile === 'fruit' || tile === 'heirloom'){
          if(abilities.fruit.acquired && abilities.heirloom.acquired){
            req.playerRef
            .child('wheelbarrow/ruby')
            .transaction(rubies => ++rubies)
        }}
        if(tile === 'fabric' || tile === 'spice'){
          if(abilities.fabric.acquired && abilities.spice.acquired){
            req.playerRef
            .child('wheelbarrow/ruby')
            .transaction(rubies => ++rubies)
        }}
      })

      return Promise.all([updateMosqueRate, updatePlayerWheelbarrow, updatePlayerAbilities])
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// 6. BLACK MARKET (1)
router.post('/blackMarket/:goodChosen/:diceRoll/', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;
  const wbSize = req.player.wheelbarrow.size;

  const updateGoodPromise = req.playerRef
    .child(`wheelbarrow/${req.params.goodChosen}`)
    .transaction(function(currentGoodCount){
      if (currentGoodCount >= wbSize) return wbSize;
      else return currentGoodCount + 1;
    })

  const updateHeirloomPromise = req.playerRef
    .child(`wheelbarrow/heirloom`)
    .transaction(currentHeirlooms => {
      let newHeirlooms = currentHeirlooms
      if (diceRoll === 7 || diceRoll === 8) newHeirlooms =  currentHeirlooms + 1;
      else if (diceRoll === 9 || diceRoll === 10) newHeirlooms = currentHeirlooms + 2;
      else if (diceRoll === 11 || diceRoll === 12) newHeirlooms = currentHeirlooms + 3;
      return newHeirlooms > wbSize ? wbSize : newHeirlooms;
    })

  Promise.all([updateGoodPromise, updateHeirloomPromise])
    .then(() => { res.sendStatus(204); })
    .catch(next);
})

// 7. TEA HOUSE (1)
router.post('/teaHouse/:gamble/:diceRoll', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;
  const gamble = +req.params.gamble
  req.playerRef
    .child('wheelbarrow/money')
    .transaction(currentMoney => {
      return (diceRoll >= gamble) ? currentMoney + gamble : currentMoney + 2;
    })
    .then(() => { res.sendStatus(204); })
    .catch(next);
})

// 8. CARAVANSARY (1)
router.post('/caravansary/:bonusCardType', (req, res, next) => {
  const type = req.params.bonusCardType;
  req.playerRef
    .child('bonusCards')
    .push({ type })
    .then(() => {
      return req.gameRef.child('caravansary/index')
        .transaction(i => ++i)
        .catch(next)
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
})
