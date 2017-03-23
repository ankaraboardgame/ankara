import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import config from '../../secret.config.js';

import { loadCurrentUser } from './action-creators/user';

/***** REDUCERS *****/
import rootReducer from './reducers';

// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// firebase config
const fbConfig = {
    apiKey: 'AIzaSyAVDzcIW786xqTB6qL5C815PxqvRT3FP38',
    authDomain: 'istanbul-aa7c8.firebaseio.com',
    databaseURL: 'https://istanbul-aa7c8.firebaseio.com/'
};

/***** STORE *****/
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument(getFirebase), // allows our thunks to have access to getFirebase
      createLogger({ collapsed: true })
    ),
    reactReduxFirebase(fbConfig, { rrfConfig })
  )
);

export default store;

store.dispatch(loadCurrentUser());
