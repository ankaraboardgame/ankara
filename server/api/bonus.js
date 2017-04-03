const Promise = require('bluebird');
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

  const promiseToDiscard = req.playerRef.child('bonusCards/fiveLira')
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
    req.playerRef.child('assistants/count').transaction(count => ++count)
      .then(() => req.playerRef.child('assistants/maxed').set(true))
      .then(() => res.sendStatus(204))
      .catch(next);
  }
});

/**
 * Select 1 'out' assistant and return to available stack
 */
router.post('/2LiraToReturn1Assistant/:assistantCoords', (req, res, next) => {
  const assistantCoords = req.params.assistantCoords;
  let assistants, assistantsOut, newAssistantsOutObj = {};

  const updateAssistantPromise = req.gameRef
    .child(`merchants/${req.player.id}/assistants`)
    .once('value', snap => {
      assistants = snap.val();
    })
    .then(() => {
      assistantsOut = assistants.out;
      for (let assistant in assistantsOut){
        if (assistantsOut[assistant] !== assistantCoords){
          newAssistantsOutObj[assistant] = assistantsOut[assistant]
        }
      }
      assistants.out = newAssistantsOutObj;
      assistants.count = ++assistants.count;

      req.gameRef
        .child(`merchants/${req.player.id}/assistants`)
        .set(assistants);
    })

  const payForAssistantPromise = req.gameRef
    .child(`merchants/${req.player.id}/wheelbarrow/money`)
    .transaction(currentMoney => {
      return currentMoney - 2
    })

    Promise.all([updateAssistantPromise, payForAssistantPromise])
    .then(() => { res.sendStatus(204); })
    .catch(next);

})

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
