import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

/******** Reducers ********/
import boardReducer from './board-reducer';

/****** Root Reducer ******/
export default combineReducers({
  board: boardReducer,
  firebase: firebaseStateReducer
});
