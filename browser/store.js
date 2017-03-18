import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/***** REDUCERS *****/
import rootReducer from './redux';

/***** STORE *****/
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);
