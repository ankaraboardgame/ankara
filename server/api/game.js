const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const Game = require('./logic');
const router = module.exports = require('express').Router();

/**
 * Game routes for initializing game
 * ...api/game/...
 */

// initialize new game
router.post('/', (req, res, next) => {

  gamesRef.child('gameOne').set(new Game())
  .then(() => {
    res.sendStatus(204); // created but no content to send back.
  })
  .catch(console.error)

});

router.param(':gameId', (req, res, next) => {

  gamesRef.once('value', function(snapshot){
    return snapshot;
  }).then(snapshot => {
    req.game = snapshot;
    next();
  })

});

router.get('/:gameId', (req, res, next) => {

  res.send(req.game);

});
