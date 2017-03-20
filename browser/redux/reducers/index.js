import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

/******** Reducers ********/
import playerReducer from './player-reducer';
import boardReducer from './board-reducer';

/****** Root Reducer ******/
export default combineReducers({
  player: playerReducer,
  board: boardReducer,
  firebase: firebaseStateReducer
});
