const firebase = require("firebase-admin");

const router = module.exports = require('express').Router();

/**
 * Player routes
 * ...api/player/...
 */

// get all players
router.get('/:gameId/:playerId', (req, res, next) => {
  const gameId = req.body.gameId;
  firebase.database().ref(`games/${gameId}`).once('value', function(snapshot){
    console.log(snapshot);
    return snapshot;
  }).then(snapshot => {
    res.send(snapshot);
  })
});

// router.param(':playerId', (req, res, next) => {

// });