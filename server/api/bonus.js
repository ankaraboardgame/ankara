const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();

/**
 * Bonus routes
 * ...api/game/:gameId/player/:playerId/bonus...
 *
 * pre-loaded:
 * req.game = holds current game data
 * req.player = holds player data
 */

/********************* Bonus Cards ************************/

/**
 * Get five lira
 */
router.post('/fiveLira', (req, res, next) => {
  const promiseToUseCard = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/money`)
    .transaction(currentMoney => currentMoney + 5);

  const promiseToDiscard = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/bonusCards/fiveLira`)
    .transaction(currentFiveLiraCard => --currentFiveLiraCard)

  Promise.all([promiseToUseCard, promiseToDiscard])
    .then(() => res.sendStatus(204))
    .catch(next);
});

/**
 * Get one good
 * sample req.params: { selectedGood: 'fruit' }
 */
router.post('/oneGood/:selectedGood', (req, res, next) => {
  const good = req.params.selectedGood;
  const promiseToUseCard = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/wheelbarrow/${good}`)
    .transaction(count => ++count)

  const promiseToDiscard = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/bonusCards/oneGood`)
    .transaction(currentOneGoodCard => --currentOneGoodCard)

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
    gamesRef.child(req.game.id)
      .child(`merchants/${req.player.id}/assistants/count`)
      .transaction(count => count + 1)
      .then(() => {
        return gamesRef.child(req.game.id)
          .child(`merchants/${req.player.id}/assistants/maxed`)
          .set(true)
      })
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

  const updateAssistantPromise = gamesRef.child(req.game.id)
    .child(`merchants/${req.player.id}/assistants`)
    .once('value', snap => {
      assistants = snap.val();
    })
    .then(() => {
      assistantsOut = assistants.out;
      for(let assistant in assistantsOut){
        if(assistantsOut[assistant] !== assistantCoords){
          newAssistantsOutObj[assistant] = assistantsOut[assistant]
        }
      }
      assistants.out = newAssistantsOutObj;
      assistants.count = ++assistants.count;
      
      gamesRef.child(req.game.id)
        .child(`merchants/${req.player.id}/assistants`)
        .set(assistants);
    })

  const payForAssistantPromise = gamesRef.child(req.game.id)
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

  Promise.all([payPromise, getGoodPromise])
  .then(() => res.sendStatus(204))
  .catch(next);
});
