const request = require('supertest');
const { expect } = require('chai');

const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

// const agent = request.agent();
const server = 'http://localhost:1337';

request(server)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

describe('GET /', function() {
  it('respond with 200', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

// describe('POST /api/game/:gameId', function() {
//   it('creates a new game in the db', function(done) {
//     request(server)
//       .get('/')
//       .expect('Content-Type', /html/)
//       .expect(200, done);
//   });
// });