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

/**
* 1a. WAINWRIGHT - Buy Extension
* Pay 7 Lira and gain +1 in cart size, max cart size is 5 (default start size: 2)
*/
router.post('/wainwright', (req, res, next) => {
  const WAINWRIGHT_PRICE = 7;
  const promisesToUpdate = [];
  promisesToUpdate.push(
    req.playerRef
    .child('wheelbarrow/money')
    .transaction(money =>  money - WAINWRIGHT_PRICE)
  )
  let wbSize;
  promisesToUpdate.push(
    req.playerRef
    .child('wheelbarrow/size')
    .transaction(size => {
      wbSize = ++size;
      return wbSize;
    })
  )
  Promise.all(promisesToUpdate)
  .then(() => { // if player maxes out wainwrights, grant her a ruby
    if (wbSize === 5){
      return req.playerRef
        .child('wheelbarrow/ruby')
        .transaction(ruby => ++ruby)
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})

 /**
 * 2. WAREHOUSES (3) - Earn maximum of respective goods
 * Cannot exceed the wheelbarrow size (which is increased after visit to the wainwright)
 * 3 warehouses: Fruit, Fabric, and Spice
 * @WB_SIZE: current size of wheelbarrow
 */
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
    .then(() => res.sendStatus(204))
    .catch(next)
})

/**
* 3. GEMSTONE DEALER - Option to buy a Ruby at current price
* Price will increase with each purchase made by any player
* @GEMSTONE_PRICE: current price of a ruby
*/
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
    .then(() => res.sendStatus(204))
    .catch(next)
});

/**
* 4a. MARKETS (2) - Trade up to 5 goods at the prevailing market rate
* @marketSize: 'smallMarket' or 'largeMarket' (dictates the market demand)
* @currentMarketIdx: refer to the index of the current market demand.
*   Each market have 5 different market demand, shuffled at the start of the game.
*   currentMarketIdx moves to next index once a trade is made
* @tradeOffer: offer made by the player
* @largeMarketRate: dictates the amount of money that player gains, depending on the number of goods traded (key: number of goods, value: amount of money)
* @smallMarketRate: idem
* @marketDemand: the current set of possible goods to trade, obtained based on the currentMarketIdx.
* @sum: refer to the sum of goods traded
* @wheelbarrow: stores the player's current amount of each goods, money, ruby and wheelbarrow size.
*/
router.post('/market/:marketSize/:currentMarketIdx/:fabricNum/:fruitNum/:heirloomNum/:spiceNum', (req, res, next) => {
  const marketSize = req.params.marketSize;
  const currentMarketIdx = req.params.currentMarketIdx;
  const tradeOffer = { fabric: req.params.fabricNum, fruit: req.params.fruitNum, heirloom: req.params.heirloomNum, spice: req.params.spiceNum };
  const largeMarketRate = { 1: 3, 2: 7, 3: 12, 4: 18, 5: 25 };
  const smallMarketRate = { 1: 2, 2: 5, 3: 9, 4: 14, 5: 20 };
  let marketDemand, sum = 0, wheelbarrow;

  req.gameRef
    .child(`${marketSize}/demandTiles/${currentMarketIdx}`)
    .once('value', snap => {
      marketDemand = snap.val()
    })
    .then(() => {
      return req.playerRef
        .child('wheelbarrow')
        .once('value', snap => {
          wheelbarrow = snap.val()
        })
        .then(() => {
          for (let good in tradeOffer){
            if (marketDemand[good] > 0){
              if (tradeOffer[good] <= marketDemand[good]){
                sum += +tradeOffer[good]
                wheelbarrow[good] -= tradeOffer[good]
              }
            }
          }
          wheelbarrow.money = (marketSize === 'smallMarket') ? wheelbarrow.money + smallMarketRate[sum] : wheelbarrow.money + largeMarketRate[sum];
          return req.playerRef.child('wheelbarrow').set(wheelbarrow)
        })
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

/**
* 4b. MARKETS (2) - Once a trade is made, update the market demand tile
* @nextMarketIdx: determines the index of the next tile, based on currentMarketIdx
*/
router.post('/market/:marketSize/:currentMarketIdx/updateTile', (req, res, next) => {
  let nextMarketIdx = ++req.params.currentMarketIdx % 5
  req.gameRef
    .child(`${req.params.marketSize}/currentMarketIdx`)
    .set(nextMarketIdx)
    .then(() => res.sendStatus(204))
    .catch(next)
})

/**
* 5. MOSQUES (2) - Option to buy Mosque tiles, which gives the player a special ability
* SMALL MOSQUE: 1. Fabric tile - gives the player the ability to re-roll their dice at the tea house or black market.
* SMALL MOSQUE: 2. Spice tile - gives the player the ability to buy 1 good of any type for 2 lira, at one of the 3 warehouses.
* LARGE MOSQUE: 1. Heirloom tile - gives the player the ability to add 1 extra assistant to the game. Can only be played once in a game.
* LARGE MOSQUE: 2. Fruit tile - gives the player the ability to return 1 assistant for 2 lira. Can only be played once in a turn.
* @mosque: 'smallMosque' or 'greatMosque'
* @tileType: 'fabic', 'fruit', 'spice', or 'heirloom'
* @tileNum: refer to the amount of required good in order to purchase the tile.
*   With every purchase, the amount required increases by 1
* @abilities: refer to the database obj that stores if which tiles and abilities the player has acquired.
* @ability: 'dieTurnOrRoll', '2LiraFor1Good', 'add1Assistant', or '2LiraToReturn1Assistant'
*/
router.post('/mosque/:mosqueSize/:selectedTile/:goodRequired', (req, res, next) => {
  const mosque = req.params.mosqueSize;
  const tileType = req.params.selectedTile;
  const tileNum = req.params.goodRequired;
  let abilities, ability;

  if (mosque === 'smallMosque') {
    if (tileType === 'fabric') {
      ability = 'dieTurnOrRoll';
    }
    if (tileType === 'spice'){
      ability = '2LiraFor1Good';
    }
  }

  if (mosque === 'greatMosque') {
    if (tileType === 'heirloom') {
      ability = 'add1Assistant';
    }
    if (tileType === 'fruit'){
      ability = '2LiraToReturn1Assistant';
    }
  }

  req.playerRef
    .child('abilities')
    .once('value', snap => {
      abilities = snap.val()
    })
    .then(() => {

      abilities[tileType].acquired = true;
      abilities[tileType].img = `./images/mosque/tiles/mosque_tile_${tileType}_${tileNum}.jpg`;

      const updateMosqueRate = req.gameRef
      .child(`${mosque}/${tileType}`)
      .transaction(currentTileRate => {
        return ++currentTileRate
      })

      const updatePlayerWheelbarrow = req.playerRef
      .child('wheelbarrow')
      .child(tileType)
      .transaction(good => --good);

      const updatePlayerAbilities = req.playerRef
      .child('abilities')
      .set(abilities)
      .then(() => {
        if (tileType === 'fruit' || tileType === 'heirloom'){
          if (abilities.fruit.acquired && abilities.heirloom.acquired){
            req.playerRef
            .child('wheelbarrow/ruby')
            .transaction(rubies => ++rubies)
          }
        }
        if (tileType === 'fabric' || tileType === 'spice'){
          if (abilities.fabric.acquired && abilities.spice.acquired){
            req.playerRef
            .child('wheelbarrow/ruby')
            .transaction(rubies => ++rubies)
          }
        }
      })

      return Promise.all([updateMosqueRate, updatePlayerWheelbarrow, updatePlayerAbilities])
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

/**
* 6. BLACK MARKET - Option to pick 1 good ('fruit', 'fabric' or 'spice' only) and roll dice for opportunity to earn heirlooms
* @diceRoll: sum of both dice rolled
* @WB_SIZE: current size of wheelbarrow
*/
router.post('/blackMarket/:selectedGood/:diceRoll/', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;
  const WB_SIZE = req.player.wheelbarrow.size;

  const updateGoodPromise = req.playerRef
    .child(`wheelbarrow/${req.params.selectedGood}`)
    .transaction(function(currentGoodCount){
      if (currentGoodCount >= WB_SIZE) return WB_SIZE;
      else return currentGoodCount + 1;
    })

  const updateHeirloomPromise = req.playerRef
    .child(`wheelbarrow/heirloom`)
    .transaction(currentHeirlooms => {
      let newHeirlooms = currentHeirlooms
      if (diceRoll === 7 || diceRoll === 8) newHeirlooms =  currentHeirlooms + 1;
      else if (diceRoll === 9 || diceRoll === 10) newHeirlooms = currentHeirlooms + 2;
      else if (diceRoll === 11 || diceRoll === 12) newHeirlooms = currentHeirlooms + 3;
      return newHeirlooms > WB_SIZE ? WB_SIZE : newHeirlooms;
    })

  Promise.all([updateGoodPromise, updateHeirloomPromise])
    .then(() => res.sendStatus(204))
    .catch(next);
})

/**
* 7. TEA HOUSE - Option to earn money
* Player pick a num between 3 to 12, and then roll dice.
* If dice sum >= player's num, player earns that amount of money.
* If dice sum < player's num, player earns 2 lira.
* @diceRoll: sum of both dice rolled
* @gamble: player's num
*/
router.post('/teaHouse/:gamble/:diceRoll', (req, res, next) => {
  const diceRoll = +req.params.diceRoll;
  const gamble = +req.params.gamble
  req.playerRef
    .child('wheelbarrow/money')
    .transaction(currentMoney => {
      return (diceRoll >= gamble) ? currentMoney + gamble : currentMoney + 2;
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})

/**
* 8. CARAVANSARY - Gain a bonus card
* Bonus cards available: +5 lira or +1 good
* @type: 'fiveLira' or 'oneGood'
*/
router.post('/caravansary/:bonusCardType', (req, res, next) => {
  const type = req.params.bonusCardType;
  req.playerRef
    .child(`bonusCards/${type}`)
    .transaction(typeNum => ++typeNum)
    .then(() => {
      return req.gameRef.child('caravansary/index')
        .transaction(i => (i + 1) % 8)
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})
