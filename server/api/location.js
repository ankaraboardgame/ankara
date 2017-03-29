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

router.post('/wainwright/earnRuby', (req, res, next) => {
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/ruby`)
    .transaction(function(currentRubies){
      return currentRubies + 1;
    });
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
router.post('/market/:marketSize/:currentMarketIdx/:fabricNum/:fruitNum/:heirloomNum/:spiceNum', (req, res, next) => {
  const marketSize = req.params.marketSize;
  const currentMarketIdx = req.params.currentMarketIdx;
  const tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, heirloom: req.params.heirloomNum, spice: req.params.spiceNum };
  const largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  const smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketDemand, sum = 0, transaction;

  gamesRef.child(req.game.id)
    .child(`${marketSize}/demandTiles/${currentMarketIdx}`)
    .once('value', snap => {
      marketDemand = snap.val()
    })
    .then(() => {
      return gamesRef.child(req.game.id)
        .child(`merchants/${req.player.id}/wheelbarrow`)
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
          return gamesRef.child(req.game.id)
            .child(`merchants/${req.player.id}/wheelbarrow`)
            .set(transaction)
        })
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

router.post('/market/:marketSize/:currentMarketIdx/updateTile', (req, res, next) => {
  let nextMarketIdx = ++req.params.currentMarketIdx % 5
  gamesRef.child(req.game.id)
    .child(`${req.params.marketSize}/currentMarketIdx`)
    .set(nextMarketIdx)
    .then(() => res.sendStatus(204))
    .catch(next)
})

// 5. MOSQUES (2)
router.post('/mosque/:mosqueSize/:selectedTile/:goodRequired', (req, res, next) => {
  // small mosque: fabric & spice
  // great mosque: heirloom & fruit
  const mosque = req.params.mosqueSize;
  const tileType = req.params.selectedTile;
  const tileNum = req.params.goodRequired;
  let abilities, ability;

  if (mosque === 'smallMosque') {
    if (tileType === 'fabric') {
      ability = 'dieTurnOrRoll'; // only for tea house or black market
    }
    if (tileType === 'spice'){
      ability = '2LiraFor1Good'; // any warehouse
    }
  }

  if (mosque === 'greatMosque') {
    if (tileType === 'heirloom') {
      ability = 'add1Assistant'; // can only be used once
    }
    if (tileType === 'fruit'){
      ability = '2LiraToReturn1Assistant'; // only once in a turn
    }
  }

  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/abilities`)
    .once('value', snap => {
      abilities = snap.val()
    })
    .then(() => {

      abilities[tileType].acquired = true;
      abilities[tileType].img = `./images/Mosque/tiles/mosque_tile_${tileType}_${tileNum}.jpg`;

      const updateMosqueRate = gamesRef.child(req.game.id)
      .child(`${mosque}/${tileType}`)
      .transaction(currentTileRate => {
        return ++currentTileRate
      })

      const updatePlayerWheelbarrow = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/${tileType}`)
      .transaction(currentGood => {
        return --currentGood
      })

      const updatePlayerAbilities = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/abilities`)
      .set(abilities)
      .then(() => {
        if(tileType === 'fruit' || tileType === 'heirloom'){
          if(abilities.fruit.acquired && abilities.heirloom.acquired){
            gamesRef.child(req.game.id)
            .child(`merchants/${req.player.id}/wheelbarrow/ruby`)
            .transaction(currentRubies => {
              return currentRubies + 1
            })
        }}
        if(tileType === 'fabric' || tileType === 'spice'){
          if(abilities.fabric.acquired && abilities.spice.acquired){
            gamesRef.child(req.game.id)
            .child(`merchants/${req.player.id}/wheelbarrow/ruby`)
            .transaction(currentRubies => {
              return currentRubies + 1
            })
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

  const updateGoodPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/${req.params.goodChosen}`)
    .transaction(function(currentGoodCount){
      if (currentGoodCount >= wbSize) return wbSize;
      else return currentGoodCount + 1;
    })

  const updateHeirloomPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/heirloom`)
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
router.post('/caravansary/:bonusCardType', (req, res, next) => {
  const type = req.params.bonusCardType;
  gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/bonusCards/${type}`)
    .transaction(typeNum => typeNum + 1)
    .then(() => {
      return gamesRef.child(`${req.game.id}/caravansary/index`)
        .transaction(i => ++i)
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
})
