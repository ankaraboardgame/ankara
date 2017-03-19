import { combineReducers } from 'redux';

/******** Reducers ********/
import playerReducer from './player-reducer';
import boardReducer from './board-reducer';

/****** Root Reducer ******/
export default combineReducers({
  player: playerReducer,
  board: boardReducer
});
