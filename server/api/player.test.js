'use strict';

const { expect } = require('chai');
var request = require('supertest-as-promised');

var app = require('../app');
var agent = request.agent(app);

var { gamesRef } = require('../../tests/firebaseTestServer.js');

/*********** Routes Tests ***********************/

describe('Player route:', function () {

  const games = {
    "testGame": {
      id : "testGame",
      merchants : {
        "id01" : {
          id : "id01"
        },
        "id02" : {
          id : "id02"
        }
      },
      playerIds : [ "id01", "id02" ],
      playerMap : {
        "id01" : "player1",
        "id02" : "player2"
      },
      playerTurn : "id01"
    }
  };

  const game = games["testGame"];


  /** First we clear the database before beginning each run */
  beforeEach(function (done) {
    gamesRef.set(games)
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  /** Also, we empty the tables after each spec */
  afterEach(function (done) {
    gamesRef.set({})
    .then(() => { done(); })
    .catch((err) => { done(err); })
  });

  describe('POST /:playerId/end', function () {

    it('expects player route to fail with blank playerId', function () {
      return agent
              .post('/api/game/testGame/player/')
              .send()
              .expect(404);
    });

    it('responds with status 204', function () {
      console.log(game.id, game.playerTurn)
      return agent
              .post(`/api/game/${game.id}/player/${game.playerTurn}/end`)
              .send()
              .expect(204);
    });

    it('updates current player turn', function (done) {
      agent
        .post(`/api/game/${game.id}/player/${game.playerTurn}/end`)
        .expect(204)
        .then( function(res) {
          gamesRef.child('testGame').child('playerTurn').once('value', function(snapshot) {
            const data = snapshot.val();
            expect(data).to.exist;
            done();
          })
        })
    });
  });
});
