'use strict';

const api = module.exports = require('express').Router();

api
  .use('/game', require('./game.js'))
  .use('/ability', require('./ability.js'))
  .use('/action', require('./action.js'))
  .use('/card', require('./card.js'))
  .use('/move', require('./move.js'))
  .use('/lobby', require('./lobby.js'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
