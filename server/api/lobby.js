'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const roomsRef = db.ref('rooms');

const express = require('express');
const router = express.Router();


/************** Lobby Routes **************/

router.post('/create', (req, res, next) => {
  const { name, creator } = req.body;
  roomsRef.push({ name, creator })
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
  console.log('here');
  roomsRef.child(req.params.roomId).remove()
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
