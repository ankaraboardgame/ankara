const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const { getRandomPosition } = require('../../game/accessories.js');

const router = module.exports = require('express').Router();

/**
 * Payment routes
 * ...api/game/:gameId/player/:playerId/encounter/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this router
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
    const payPromise = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/money`)
      .transaction(function(currentMoney){
        return currentMoney - 2;
      });
    const getGoodPromise = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/${goodWanted}`)
      .transaction(function(currGoodCount){
        return currGoodCount + 1;
      });
    promiseForTrade = Promise.all([payPromise, getGoodPromise]);

  } else {
    const giveGoodPromise = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/${trade}`)
      .transaction(function(currGoodCount){
        return currGoodCount - 1;
      });
    const getGoodPromise = gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/wheelbarrow/${goodWanted}`)
      .transaction(function(currGoodCount){
        return currGoodCount + 1;
      });
    promiseForTrade = Promise.all([giveGoodPromise, getGoodPromise]);
  }

  promiseForTrade
  .then(() => {
    // reassign smuggler position
    return gamesRef.child(req.game.id)
    .child('smuggler').child('coordinates')
    .transaction(() => {
      return getRandomPosition(4, 3);
    });
  })
  .then(() => {
    res.sendStatus(204);
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
        return gamesRef.child(req.game.id)
          .child(`merchants/${otherId}/wheelbarrow/money`)
          .transaction(function(currentMoney){
            return currentMoney + 2;
          });
      })
      .concat( // promise for decrementing your money
        gamesRef.child(req.game.id)
        .child(`merchants/${req.player.id}/wheelbarrow/money`)
        .transaction(function(currentMoney){
          return currentMoney - 2 * otherMerchantIds.length;
        })
      )
  Promise.all(promisesToPayMerchants)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
