// 'use strict';

// const { expect } = require('chai');
// var request = require('supertest-as-promised');

// var app = require('../app');
// var agent = request.agent(app);

// var { gamesRef } = require('../../tests/firebaseTestServer.js');

// const Game = require('../../game/logic.js');

// /*********** Encounter Tests ***********************/

// describe('Player route:', function () {

//   const SEED = {
//     roomId: 'testRoom',
//     gameId: 'test',
//     usersMap: {
//       1: 'Maria',
//       2: 'Sokmean',
//       3: 'Dan',
//       4: 'Jae'
//     },
//     playerId: 1,
//     playerTurn: 1
//   }

//   /** Seed the database before beginning each run */
//   beforeEach(function (done) {
//     gamesRef.child(SEED.roomId)
//     .set(new Game(SEED.gameId, SEED.usersMap))
//     .then(() => { done(); })
//     .catch((err) => { done(err); })
//   });

//   /** Empty the db after each spec */
//   afterEach(function (done) {
//     gamesRef.set({})
//     .then(() => { done(); })
//     .catch((err) => { done(err); })
//   });

//   describe('POST /smuggler', function () {

//     it('expects a payload with goodWanted and trade properties', function () {
//       return agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/smuggler`)
//         .send()
//         .expect(500);
//     });

//     it('gets a good in exchange for something', function () {
//       return agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/smuggler`)
//         .send({ goodWanted: 'fruit', trade: 'lira' })
//         .expect(204)
//         .then(() => {
//           gamesRef.child(SEED.roomId).child(SEED.playerId).child('wheelbarrow')
//             .once('value', function(snapshot) {
//               const data = snapshot.val();
//               console.log(data);
//               expect(+data).to.equal(1);
//               done();
//             })
//         })
//     });

//     it('relocates the smuggler', function (done) {
//       agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/smuggler`)
//         .expect(204)
//         .then( function(res) {
//           // gamesRef.child(SEED.roomId).child('playerTurn')
//           //   .once('value', function(snapshot) {
//           //     const data = snapshot.val();
//           //     expect(+data).to.equal(2);
//           //     done();
//           //   })
//         })
//     });
//   });

//   describe('POST /merchant', function () {

//     it('expects a payload with ids of other merchants', function () {
//       return agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/merchant`)
//         // .send()
//         // .expect(404);
//     });

//     it('responds with status 204', function () {
//       return agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/merchant`)
//         .send()
//         .expect(204);
//     });

//     it('updates current player turn', function (done) {
//       agent
//         .post(`/api/game/${SEED.roomId}/player/encounter/merchant`)
//         .expect(204)
//         .then( function(res) {
//           gamesRef.child(SEED.roomId).child('playerTurn')
//             .once('value', function(snapshot) {
//               const data = snapshot.val();
//               expect(+data).to.equal(2);
//               done();
//             })
//         })
//     });
//   });
// });
