'use strict';

const api = module.exports = require('express').Router();

api
  .use('/player', require('./routes/player.js'))
  .use('/location', require('./routes/location.js'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
