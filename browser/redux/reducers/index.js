import { combineReducers } from 'redux';

/******** Reducers ********/
import playerReducer from './player-reducer';

/****** Root Reducer ******/
export default combineReducers({
  player: playerReducer
});
