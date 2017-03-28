// 'use strict';

// const { expect } = require('chai');
// var request = require('supertest-as-promised');

// var app = require('../app');
// var agent = request.agent(app);

// const firebaseAdmin = require('firebase-admin');
// const serviceAccount = require('../../tests/secret-firebase-test-server.json');
// const key = {
//   apiKey: 'AIzaSyBzVhw7ppsPkNKEahvABSl8ojMHqEd5lAg',
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   authDomain: 'istanbul-test.firebaseapp.com',
//   databaseURL: 'https://istanbul-test.firebaseio.com/'
// }

// // Initialize the app
// const testFirebase = firebaseAdmin.initializeApp(key, 'istanbul-test-firebase');

// const db = testFirebase.database();
// const gamesRef = db.ref('games');

// const Game = require('../../game/logic.js');


// /************** Route Tests ***********************/

// describe('Location routes:', function () {

//   const usersMap = {
//       usersMap: {
//         1: 'Maria',
//         2: 'Sokmean',
//         3: 'Dan',
//         4: 'Jae'
//       }
//     }

//   /** Clear the database before beginning each run */
//   beforeEach(function () {
//     return gamesRef.set(new Game('locationTest', usersMap));
//   });

//   /** Empty the db after each spec */
//   afterEach(function () {
//     return gamesRef.set({})
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
