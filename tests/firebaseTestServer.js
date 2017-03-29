// const FirebaseServer = require('firebase-server');

// const Game = require('../game/logic.js');
// const testGame = new Game('test', { 1: 'Jack', 2: 'Jill' });

// new FirebaseServer(5000, 'localhost.firebaseio.test', {
// 	testGame
// });


const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./secret-firebase-test-server.js');
const key = {
  apiKey: 'AIzaSyBzVhw7ppsPkNKEahvABSl8ojMHqEd5lAg',
  credential: firebaseAdmin.credential.cert(serviceAccount),
  authDomain: 'istanbul-test.firebaseapp.com',
  databaseURL: 'https://istanbul-test.firebaseio.com/'
}

// Initialize the app
const testFirebase = firebaseAdmin.initializeApp(key, 'istanbul-test-firebase');

const db = testFirebase.database();
const gamesRef = db.ref('games');

module.exports = { db, gamesRef };
