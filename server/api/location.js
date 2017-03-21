const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const router = module.exports = require('express').Router();
/**
 * Location routes
 * ...api/location/...
 */

 // Warehouse - Depending on the goodType, player will get max amount
router.post('/warehouse/:playerId/:goodType', (req, res, next) => {
  const playerId = req.params.playerId;
  const goodType = req.params.goodType;
  let WB_SIZE;
  gamesRef.child('gameOne')
    .child(`merchants/${playerId}/wheelbarrowSize`)
    .once('value', snap => {
      WB_SIZE = snap.val()
    })
    .then(() => {
      return gamesRef.child('gameOne')
        .child(`merchants/${playerId}/${goodType}`)
        .set(WB_SIZE)
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(console.error)
})

// Small Market - Trade
router.post('/smallMarket/:playerId/:fabricNum/:fruitNum/:jewelryNum/:spiceNum', (req, res, next) => {
  const playerId = req.params.playerId;
  const fabricNum = req.params.fabricNum;
  const fruitNum = req.params.fruitNum;
  const jewelryNum = req.params.jewelryNum;
  const spiceNum = req.params.spiceNum;
  // need to be completed
})
