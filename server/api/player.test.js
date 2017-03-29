'use strict';

const { expect } = require('chai');
var request = require('supertest-as-promised');

var app = require('../app');
var agent = request.agent(app);

var { gamesRef } = require('../../tests/firebaseTestServer.js');

const Game = require('../../game/logic.js');

/*********** Routes Tests ***********************/

describe('Player route:', function () {

  const SEED = {
    roomId: 'testRoom',
    gameId: 'test',
    usersMap: {
      1: 'Maria',
      2: 'Sokmean',
      3: 'Dan',
      4: 'Jae'
    },
    playerTurn: 1
  }

  /** Seed the database before beginning each run */
  beforeEach(function (done) {
    gamesRef.child(SEED.roomId)
    .set(new Game(SEED.gameId, SEED.usersMap))
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  /** Empty the db after each spec */
  afterEach(function (done) {
    gamesRef.set({})
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  describe('POST /:playerId/end', function () {

    it('expects player route to fail with blank playerId', function () {
      return agent
              .post(`/api/game/${SEED.roomId}/player/`)
              .send()
              .expect(404);
    });

    it('responds with status 204', function () {
      return agent
              .post(`/api/game/${SEED.roomId}/player/${SEED.playerTurn}/end`)
              .send()
              .expect(204);
    });

    it('updates current player turn', function (done) {
      agent
        .post(`/api/game/${SEED.roomId}/player/${SEED.playerTurn}/end`)
        .expect(204)
        .then( function(res) {
          gamesRef.child(SEED.roomId).child('playerTurn')
            .once('value', function(snapshot) {
              const data = snapshot.val();
              expect(+data).to.equal(2);
              done();
            })
        })
    });
  });
});
