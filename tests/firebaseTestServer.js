const FirebaseServer = require('firebase-server');

const Game = require('../game/logic.js');
const testGame = new Game('test', { 1: 'Jack', 2: 'Jill' });

new FirebaseServer(5000, 'localhost.firebaseio.test', {
	testGame
});
