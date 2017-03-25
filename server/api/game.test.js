'use strict';

const { expect } = require('chai');
var request = require('supertest-as-promised');

var app = require('../app');
var agent = request.agent(app);

const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../../tests/secret-firebase-test-server.json');
const key = {
  apiKey: 'AIzaSyBzVhw7ppsPkNKEahvABSl8ojMHqEd5lAg',
  credential: firebaseAdmin.credential.cert(serviceAccount),
  authDomain: 'istanbul-test.firebaseapp.com',
  databaseURL: 'https://istanbul-test.firebaseio.com/'
}

// Initialize the app
firebaseAdmin.initializeApp(key, 'constantinople-test-firebase');

const db = firebaseAdmin.database();
const gamesRef = db.ref('games');

/*********** Routes Tests ***********************/

describe('Game route:', function () {

  const body = {
      usersMap: {
        1: 'Maria',
        2: 'Sokmean',
        3: 'Dan',
        4: 'Jae'
      }
    }

  /** First we clear the database before beginning each run */
  // before(function (done) {
  //   gamesRef.set({})
  //   .then(() => { done(); })
  //   .catch((err) => { done(err); })
  // });

  /** Also, we empty the tables after each spec */
  // afterEach(function (done) {
  //   gamesRef.set({})
  //   .then(() => { done(); })
  //   .catch((err) => { done(err); })
  // });

  describe('POST /:gameId', function () {

    it('expects a usersMap payload', function () {
      return agent
              .post('/api/game/testGame')
              .send({})
              .expect(500);
    });

    it('responds with status 204', function () {
      return agent
              .post('/api/game/testGame')
              .send(body)
              .expect(204);
    });

    it('initiates a new game in firebase', function () {
      return agent
        .post('/api/game/testGame')
        .send(body)
        .expect(204)
        .expect(function(res) {
          return gamesRef.once('value', function(snapshot){
            const data = snapshot.val();
            console.log(data);
            expect(data).to.exist;
          })
        })
    });
  });
});
