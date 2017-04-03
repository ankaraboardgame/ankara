const admin = require('firebase-admin');
const Promise = require('bluebird');

const { getRandomPosition } = require('../../game/accessories.js');

const router = module.exports = require('express').Router();

/** Game Logging */
const util = require('../util');
const log = util.log;

/**
 * Payment routes
 * ...api/game/:gameId/player/:playerId/encounter/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

/**
 * Pay or trade with smuggler
 * sample req.body:
 * {
 *    goodWanted: 'heirloom',
 *    trade: 'lira'
 * }
 */
router.post('/smuggler', (req, res, next) => {
  const goodWanted = req.body.goodWanted;
  const trade = req.body.trade;
  let promiseForTrade;

  if (!trade) {
    return next( new Error('Invalid params to smuggler route.') );

  } else if (trade === 'lira') {
    const payPromise = req.playerRef.child('wheelbarrow/money')
      .transaction(money => money - 2);
    const getGoodPromise = req.playerRef.child(`wheelbarrow/${goodWanted}`)
      .transaction(count => ++count);
    promiseForTrade = Promise.all([payPromise, getGoodPromise]);

  } else {
    const giveGoodPromise = req.playerRef.child(`wheelbarrow/${trade}`)
      .transaction(count => --count);
    const getGoodPromise = req.playerRef.child(`wheelbarrow/${goodWanted}`)
      .transaction(count => ++count);
    promiseForTrade = Promise.all([giveGoodPromise, getGoodPromise]);
  }

  promiseForTrade
  .then(() => {
    // reassign smuggler position
    return req.gameRef
      .child('smuggler').child('coordinates')
      .transaction(() => getRandomPosition(4, 3));
  })
  .then((val) => {
    res.sendStatus(204);
    //game log
    log(req.game.id, {
      type: 'SMUGGLER_MOVE',
      location: `${val.snapshot.val()}`,
      timestamp: admin.database.ServerValue.TIMESTAMP
    })
  })
  .catch(next);

});


/**
 * Pay other merchants
 * sample req.body:
 * {
 *    ids: ["Bob123", "Linda234"]
 * }
 */
router.post('/merchant', (req, res, next) => {
  const otherMerchantIds = req.body.ids;

  const promisesToPayMerchants =
    otherMerchantIds
      .map(otherId => { // promises for paying other merchants
        return req.gameRef
          .child(`merchants/${otherId}/wheelbarrow/money`)
          .transaction(money => money + 2);
      })
      .concat( // promise for decrementing your money
        req.playerRef.child('wheelbarrow/money')
        .transaction(money => money - 2 * otherMerchantIds.length)
      )
  Promise.all(promisesToPayMerchants)
    .then(() => res.sendStatus(204))
    .catch(next);
});
