'use strict';

const { expect } = require('chai');
var request = require('supertest-as-promised');

var app = require('../app');
var agent = request.agent(app);

var { gamesRef } = require('../../tests/firebaseTestServer.js');

const Game = require('../../game/logic.js');

/*********** Game Route Tests ***********************/

describe('Game (api/game) route:', function () {

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

  /** Clear the database before beginning each run */
  beforeEach(function (done) {
    gamesRef.set({})
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  /** Empty the db after each spec */
  afterEach(function (done) {
    gamesRef.set({})
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  describe('POST /:roomId', function () {

    it('expects a payload', function () {
      return agent
              .post(`/api/game/${SEED.roomId}`)
              .send()
              .expect(500);
    });

    it('creates a new game in the database', function (done) {
      agent
        .post(`/api/game/${SEED.roomId}`)
        .send({ usersMap: SEED.usersMap })
        .expect(204)
        .then(function(){
          gamesRef.child(SEED.roomId)
            .once('value', function(snapshot) {
              const data = snapshot.val();
              expect(data).to.exist;
              expect(data.merchants).to.exist;
              done();
            })
        })
    });
  });
});
