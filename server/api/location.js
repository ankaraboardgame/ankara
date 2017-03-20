const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');
const router = module.exports = require('express').Router();
/**
 * Location routes
 * ...api/location/...
 */

 // Warehouse - Depending on the goodType, player will get max amount

router.put('/warehouse/:playerId/:goodType', (req, res, next) => {
  console.log('req.params', req.params);
  const player = gamesRef.child('gameOne').child('merchants').child(`${req.params.playerId}`)
  const good = player.child(`${req.params.goodType}`)
  const wbSize = player.child('wheelbarrowSize')
  wbSize.once('value').then(snap => {
    good.set(snap.val());
    next();
  })
})
