const http = require('http');
const express = require('express');

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const firebaseAdmin = require('firebase-admin');

// process.env - config vars set-up on heroku side
let serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};


// // environment variables
// databaseURL = process.env.



if(!serviceAccount.private_key){
  serviceAccount = require('../secret.firebase.env');
}

// Initialize the app with a service account, granting admin privileges
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://istanbul-aa7c8.firebaseio.com/'
});


// const firebaseAdmin = require('firebase-admin');
// const serviceAccount = require('./secret-firebase-test-server.json');
// const key = {
//   apiKey: 'AIzaSyBzVhw7ppsPkNKEahvABSl8ojMHqEd5lAg',
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   authDomain: 'istanbul-test.firebaseapp.com',
//   databaseURL: 'https://istanbul-test.firebaseio.com/'
// }

// Initialize the app
// const testFirebase = firebaseAdmin.initializeApp(key, 'istanbul-test-firebase');



/** Logging Middleware */
app.use(morgan('dev'));

/** Body Parsing Middleware for POST/PUT reqeusts */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Static File Middleware */
const rootPath = path.join(__dirname, '..');
const browserPath = path.join(rootPath, 'browser');
const publicPath = path.join(rootPath, 'public');
const imagesPath = path.join(rootPath, 'public/images');
const gamePath = path.join(rootPath, 'game');

app.use(express.static(rootPath));
app.use(express.static(browserPath));
app.use(express.static(publicPath));
app.use(express.static(imagesPath));
app.use(express.static(gamePath));

/** API routes */
app.use('/api', require('./api'));

/** Default Error-handling Middleware */
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

/** Game logger */
const GameLogger = require('./GameLogger');
// GameLogger();

/** Starting Server */
if (module === require.main) {
	const PORT = process.env.PORT || 1337;
	server.listen(PORT, () => {
		console.log('Server now listening on port', PORT);
	});
}

module.exports = app;
