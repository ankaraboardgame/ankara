'use strict';

import firebase from 'firebase';
import config from '../secret.config.js'

firebase.initializeApp(config.firebase);
const database = firebase.database();

export default database;
