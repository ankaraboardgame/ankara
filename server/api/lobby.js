'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const roomsRef = db.ref('rooms');

const router = module.exports = require('express').Router();


/************** Lobby Routes **************/

router.post('/create', (req, res, next) => {
  const { name, creator } = req.body;
  roomsRef.push({
    name,
    creator,
    createdAt: admin.database.ServerValue.TIMESTAMP
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

router.post('/join', (req, res, next) => {
  const { roomId, userId, name } = req.body;
  roomsRef.child(roomId).child('users').child(userId)
    .set(name)
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/leave', (req, res, next) => {
  const { roomId, userId } = req.body;
  roomsRef.child(roomId).child('users').child(userId)
    .remove()
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/:roomId/delete', (req, res, next) => {
  roomsRef.child(req.params.roomId).remove()
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/:roomId/ready', (req, res, next) => {
  roomsRef.child(req.params.roomId).child('ready')
    .child(req.body.userId)
    .set(true)
    .then(() => res.sendStatus(204))
    .catch(next);
});