'use strict';

import firebase from 'firebase';
import config from '../secret.config.js'

const firebaseApp = firebase.initializeApp(config.firebase);
export const fbDB = firebase.database();
export const fbAuth = firebaseApp.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
