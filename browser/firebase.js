'use strict';

// import firebase from 'firebase';
import config from '../firebase.config.js'

const firebase = require("firebase");
require("firebase/auth");
require("firebase/database");


firebase.initializeApp(config.firebase);
export const fbDB = firebase.database();
export const fbAuth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
