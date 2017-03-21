import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

/******** Reducers ********/
import playerReducer from './player-reducer';
import boardReducer from './board-reducer';
import userReducer from './user-reducer';

/****** Root Reducer ******/
export default combineReducers({
  player: playerReducer,
  board: boardReducer,
  user: userReducer,
  firebase: firebaseStateReducer
});
