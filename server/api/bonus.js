const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Bonus routes
 * ...api/game/:gameId/player/:playerId/bonus...
 *
 * pre-loaded:
 * req.game = specific game instance
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

/********************* Bonus Cards ************************/

/**
 * Get five lira
 */
router.post('/fiveLira', (req, res, next) => {

  const promiseToUseCard = req.playerRef.child('wheelbarrow/money')
    .transaction(currentMoney => currentMoney + 5);

  const promiseToDiscard = req.playerRef.child('/bonusCards/fiveLira')
    .transaction(currentFiveLiraCard => --currentFiveLiraCard)

  Promise.all([promiseToUseCard, promiseToDiscard])
    .then(() => res.sendStatus(204))
    .catch(next);
});

/**
 * Get one good
 */
router.post('/oneGood/:selectedGood', (req, res, next) => {
  const good = req.params.selectedGood;
  const promiseToUseCard = req.playerRef.child(`wheelbarrow/${good}`)
    .transaction(count => ++count)

  const promiseToDiscard = req.playerRef.child('/bonusCards/oneGood')
    .transaction(count => --count)

  Promise.all([promiseToUseCard, promiseToDiscard])
    .then(() => res.sendStatus(204))
    .catch(next);
});

/********************* Mosque Tiles ***********************/

/**
 * Add 1 Assistant
 */
router.post('/add1Assistant', (req, res, next) => {
  if (req.player.assistants.maxed){
    next(new Error('Cannot add assistant. Already maxed out.'))
  } else {
    req.playerRef.child('assistants/count').transaction(count => count + 1)
      .then(() => req.playerRef.child('assistants/maxed').set(true))
      .then(() => res.sendStatus(204))
      .catch(next);
  }
});

/**
 * Get one good
 * sample req.body: { assistant: "0,1" }
 */
// router.post('/2LiraToReturn1Assistant', (req, res, next) => {
//   const good = req.body.good;
//   req.gameRef
//     .child(`merchants/${req.player.id}/wheelbarrow/${good}`)
//     .transaction(count => ++count)
//     .then(() => res.sendStatus(204))
//     .catch(next);
// });

/**
 * Get five lira
 */
// router.post('/dieTurnOrRoll', (req, res, next) => {
//   req.gameRef
//     .child(`merchants/${req.player.id}/wheelbarrow/money`)
//     .transaction(currentMoney => currentMoney + 5)
//     .then(() => res.sendStatus(204))
//     .catch(next);
// });

/**
 * Get one good
 * sample req.body: { good: 'fruit' }
 */
router.post('/2LiraFor1Good', (req, res, next) => {
  const goodWanted = req.body.goodWanted;

  const payPromise = req.playerRef.child('wheelbarrow/money')
    .transaction(money => money - 2);

  const getGoodPromise = req.playerRef.child(`wheelbarrow/${goodWanted}`)
    .transaction(good => ++good);

  Promise.all([payPromise, getGoodPromise])
  .then(() => res.sendStatus(204))
  .catch(next);
});
