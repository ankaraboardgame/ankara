'use strict';

const api = module.exports = require('express').Router();

api
  .use('/player', require('./api/player.js'))
  .use('/location', require('./api/location.js'))
  .use('/game', require('./api/game.js'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
