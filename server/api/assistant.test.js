// const { expect } = require('chai');
// const firebaseAdmin = require('firebase-admin');

// Fetch the service account key JSON file contents
// const serviceAccount = require('../../tests/secret-firebase-test-server.json');

// Initialize the app with a service account, granting admin privileges
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: 'https://istanbul-test.firebaseio.com/'
// });

// const db = firebaseAdmin.database();

// const agent = request.agent();
// const SERVER = 'http://localhost:1337';

// describe('POST /', function(){
//   it('responds with 200', function(done){
//     axios.post(SERVER + '/api/game/test').then((res) => {

//     })
//   })
// })

// request(server)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

// describe('GET /', function() {
//   it('respond with 200', function(done) {
//     request(server)
//       .get('/')
//       .expect('Content-Type', /html/)
//       .expect(200, done);
//   });
// });

// describe('POST /api/game/:gameId', function() {
//   it('creates a new game in the db', function(done) {
//     request(server)
//       .get('/')
//       .expect('Content-Type', /html/)
//       .expect(200, done);
//   });
// });
