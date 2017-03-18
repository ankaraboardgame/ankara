import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'
import createLogger  from 'redux-logger'


export default createStore(
  reducer,
  applyMiddleware(thunk, createLogger({ collapsed: true}) )
);
