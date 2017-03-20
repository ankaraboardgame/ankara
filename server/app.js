const http = require('http');
const express = require('express');

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const firebaseAdmin = require('firebase-admin');

// Fetch the service account key JSON file contents
var serviceAccount = require('../secret-istanbul-aa7c8-firebase-adminsdk-inz62-81ab05ed15.json');

// Initialize the app with a service account, granting admin privileges
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://istanbul-aa7c8.firebaseio.com/'
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
// var firebaseDB = firebseAdmin.database();
// var ref = firebaseDB.ref("/");
// ref.once("value", function(snapshot) {
//   console.log('firebase log', snapshot.val());
// });

const LobbyService = require('../game/LobbyService');
const Game = null;
// var lobby = new LobbyService(io, Game);
// lobby.start();

/** Logging Middleware */
app.use(morgan('dev'));

/** Body Parsing Middleware for POST/PUT reqeusts */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Routing middleware */
app.use('/api', require('./api'));

/** Static File Middleware */
const rootPath = path.join(__dirname, '..');
const browserPath = path.join(rootPath, 'browser');
const publicPath = path.join(rootPath, 'public');
const imagesPath = path.join(rootPath, 'public/images');
const gamePath = path.join(rootPath, 'game');

app.use(express.static(rootPath));
app.use(express.static(browserPath));
app.use(express.static(publicPath));
app.use(express.static(imagesPath));
app.use(express.static(gamePath));

/** API routes */
app.use('/api/:playerId', require('./api'));

/** Default Error-handling Middleware */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message);
});

/** Starting Server */

const PORT = process.env.PORT || 1337;
server.listen(PORT, () => {
    console.log('Server now listening on port', PORT);
});

module.exports = app;
