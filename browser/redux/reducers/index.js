import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

/******** Reducers ********/
import boardReducer from './board-reducer';
import userReducer from './user-reducer';
import roomReducer from './room-reducer';
import gameReducer from './game-reducer';

/****** Root Reducer ******/
export default combineReducers({
  board: boardReducer,
  user: userReducer,
  firebase: firebaseStateReducer,
  room: roomReducer,
  game: gameReducer
});
