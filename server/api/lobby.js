'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const sessionRef = db.ref('session');

const express = require('express');
const router = express.Router();
module.exports = router;

router.put('/:userId', function (req, res, next) {
  const userId = req.params.userId

  //add user to the game
  const data = {};
  data[userId] = true;
  const ref = db.ref(`/session`).child('connectedPlayers');
  ref.update(data);

});
