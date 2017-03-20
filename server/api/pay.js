const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Payment routes
 * ...api/player/:gameId/:playerId/pay/...
 * 
 * preloaded on req:
 * req.game = specific game instance
 * req.player = the player hitting this router
 */

// load specific game
router.param(':otherMerchantId', (req, res, next, otherMerchantId) => {
  console.log('here in param')
  gamesRef.child('gameOne')
    .child('merchants')
    .child(`${otherMerchantId}`)
    .once('value', function(snapshot){
      return snapshot;
    })
    .then(snapshot => {
      console.log(snapshot.val())
      req.otherMerchant = snapshot.val();
      next();
    })
    .catch(console.error)
});

router.post('/:otherMerchantId', (req, res, next) => {
  const payment = 2;

  gamesRef.child('gameOne')
    .child('merchants')
    .child(`${req.player.number}`)
    .child('money')
    .set(req.player.money - payment)
    .then(() => {
      console.log('paid other merchant')
    })
    .catch(console.error)
});
