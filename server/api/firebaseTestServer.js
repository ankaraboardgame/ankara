var FirebaseServer = require('firebase-server');

new FirebaseServer(5000, 'localhost.firebaseio.test', {
	states: {
		CA: 'California',
		AL: 'Alabama',
		KY: 'Kentucky'
	}
});
