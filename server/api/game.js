const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const Game = require('../../game/logic.js');
const router = module.exports = require('express').Router();

/**
 * Game routes for initializing game
 * ...api/game/...
 */

// initialize new game
router.post('/', (req, res, next) => {
// TODO:  const ids = db.ref('session/users')
  gamesRef.child('gameOne').set(new Game(['player1', 'player2', 'player3', 'player4']))
  .then(() => {
    res.sendStatus(204); // created but no content to send back
  })
  .catch(console.error);
});

// load specific game
router.param('gameId', (req, res, next) => {
  gamesRef.child('gameOne').once('value', function(snap){
    return snap;
  }).then(snapshot => {
    req.game = snapshot.val();
    next();
  })
});

// get one specific game
router.get('/:gameId', (req, res, next) => {
  res.send(req.game);
});

// player-specific routes
router.use('/:gameId/player', require('./player.js'));
