// 'use strict';

// const { expect } = require('chai');
// var request = require('supertest-as-promised');

// var app = require('../app');
// var agent = request.agent(app);

// var { gamesRef } = require('../../tests/firebaseTestServer.js');

// const Game = require('../../game/logic.js');

// /***********  Test ***********************/

// describe('Player route:', function () {

//   const SEED = {
//     id: 'test',
//     usersMap: {
//       1: 'Maria',
//       2: 'Sokmean',
//       3: 'Dan',
//       4: 'Jae'
//     }
//   }

//   /** Clear the database before beginning each run */
//   beforeEach(function (done) {
//     gamesRef.set(new Game(SEED.id, SEED.usersMap))
//     .then(() => { done(); })
//     .catch((err) => { done(err); })
//   });

//   /** Empty the db after each spec */
//   afterEach(function (done) {
//     gamesRef.set({})
//     .then(() => { done(); })
//     .catch((err) => { done(err); })
//   });

//   describe('WAINWRIGHT', function () {

//     it('updates user\'s cart size', function () {
//       return agent
//               .post('/api/game/locationTest/user/1/location/wainwright')
//               .send({})
//               .expect(204)
//               .expect((res) => {
//                 return gamesRef.once('value', function(snapshot){
//                   const data = snapshot.val();
//                   expect(data).to.exist;
//               })
//     });

//     it('initiates a new game in firebase', function () {
//       return agent
//         .post('/api/game/testGame')
//         .send(body)
//         .expect(204)
//         .expect(function(res) {
//           return gamesRef.once('value', function(snapshot){
//             const data = snapshot.val();
//             expect(data).to.exist;
//           })
//         })
//     });
//   });

//   describe('POST /api/game/:gameId/user/:userId/location/wainwright', function () {

//     it('updates', function () {
//       return agent
//               .post('/api/game/testGame')
//               .send({})
//               .expect(500);
//     });

//     it('responds with status 204', function () {
//       return agent
//               .post('/api/game/testGame')
//               .send(body)
//               .expect(204);
//     });

//     it('initiates a new game in firebase', function () {
//       return agent
//         .post('/api/game/testGame')
//         .send(body)
//         .expect(204)
//         .expect(function(res) {
//           return gamesRef.once('value', function(snapshot){
//             const data = snapshot.val();
//             expect(data).to.exist;
//           })
//         })
//     });
//   });

//     describe('POST /api/game/:gameId/user/:userId/location/wainwright', function () {

//     it('updates', function () {
//       return agent
//               .post('/api/game/testGame')
//               .send({})
//               .expect(500);
//     });

//     it('responds with status 204', function () {
//       return agent
//               .post('/api/game/testGame')
//               .send(body)
//               .expect(204);
//     });

//     it('initiates a new game in firebase', function () {
//       return agent
//         .post('/api/game/testGame')
//         .send(body)
//         .expect(204)
//         .expect(function(res) {
//           return gamesRef.once('value', function(snapshot){
//             const data = snapshot.val();
//             expect(data).to.exist;
//           })
//         })
//     });
//   });
// });
