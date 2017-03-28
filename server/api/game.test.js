// 'use strict';

// const { expect } = require('chai');
// var request = require('supertest-as-promised');

// var app = require('../app');
// var agent = request.agent(app);

// var { gamesRef } = require('../../tests/firebaseTestServer.js');


/*********** Game Route Tests ***********************/

// describe('Game route:', function () {

//   const body = {
//       usersMap: {
//         1: 'Maria',
//         2: 'Sokmean',
//         3: 'Dan',
//         4: 'Jae'
//       }
//     }

  /** Clear the database before beginning each run */
  // beforeEach(function () {
  //   return gamesRef.set({})
  // });

  /** Empty the db after each spec */
  // afterEach(function () {
  //   return gamesRef.set({})
  // });

//   describe('POST /:gameId', function () {

//     it('expects a usersMap payload', function () {
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
//             console.log(data);
//             expect(data).to.exist;
//           })
//         })
//     });
//   });
// });
