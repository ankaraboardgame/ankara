const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const Promise = require('bluebird');

const router = module.exports = require('express').Router();

/**
 * Payment routes
 * ...api/player/:gameId/:playerId/pay/...
 * 
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this router
 */

router.post('/gemstonedealer', (req, res, next) => {
  gamesRef.child('gameOne')
    .child('merchants')
    .child(`${otherMerchantId}`)
    .once('value', function(snap){
      return snap.val();
    })
    .then(snapshot => {
      req.otherMerchant = snapshot.val();
      next();
    })
    .catch(console.error)
});

// load specific game
router.param(':otherMerchantId', (req, res, next, otherMerchantId) => {
  gamesRef.child('gameOne')
    .child('merchants')
    .child(`${otherMerchantId}`)
    .once('value', function(snap){
      return snap.val();
    })
    .then(snapshot => {
      req.otherMerchant = snapshot.val();
      next();
    })
    .catch(console.error)
});

router.post('/:otherMerchantId', (req, res, next) => {
  const PAYMENT = 2;

  var payPromise = gamesRef.child('gameOne')
    .child('merchants')
    .child(req.player.id)
    .child('money')
    .transaction(function(currentMoney){
      return currentMoney - PAYMENT;
    });

  var getPaidPromise = gamesRef.child('gameOne')
    .child('merchants')
    .child(req.otherMerchant.id)
    .child('money')
    .transaction(function(currentMoney){
      return currentMoney + PAYMENT;
    });

  Promise.all([payPromise, getPaidPromise]).then(() => {
    console.log(`${req.player.id} paid ${req.otherMerchant.id}`)
    res.sendStatus(204);
  })
});
