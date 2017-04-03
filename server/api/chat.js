'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const chatsRef = db.ref('chats');
const gamesRef = db.ref('games');

const router = module.exports = require('express').Router();


/************** Message Routes **************/

router.post('/lobby', (req, res, next) => {
  const { id, name, message } = req.body;
  chatsRef.push({
    id,
    name,
    message,
    type: 'lobby',
    createdAt: admin.database.ServerValue.TIMESTAMP
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

router.post('/game/:gameId', (req, res, next) => {
  const { id, name, message } = req.body;
  gamesRef.child(req.params.gameId).child('chats').push({
    id,
    name,
    message,
    type: 'game',
    createdAt: admin.database.ServerValue.TIMESTAMP
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});
