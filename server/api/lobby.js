'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const roomsRef = db.ref('rooms');

const express = require('express');
const router = express.Router();


router.post('/lobby/create', (req, res, next) => {
  const { name } = req.body;
  roomsRef.push({name})
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/lobby/join', (req, res, next) => {
  const { roomId, userId, name } = req.body;
  roomsRef.child(roomId).child('users').child(userId)
    .set(name)
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.post('/lobby/:roomId/delete', (req, res, next) => {
  roomsRef.child(roomId).remove()
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
