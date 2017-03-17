const http = require('http');
const express = require('express');

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const LobbyService = require('../game/LobbyService');
const Game = null;
var lobby = new LobbyService(io, Game);
lobby.start();

/** Logging Middleware */
app.use(morgan('dev'));

/** Body Parsing Middleware for POST/PUT reqeusts */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Static File Middleware */
const rootPath = path.join(__dirname, '..');
const browserPath = path.join(rootPath, 'browser');
const publicPath = path.join(rootPath, 'public');
const imagesPath = path.join(rootPath, 'public/images');

app.use(express.static(rootPath));
app.use(express.static(browserPath));
app.use(express.static(publicPath));
app.use(express.static(imagesPath));

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
