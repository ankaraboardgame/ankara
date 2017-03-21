import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

/******** Reducers ********/
import boardReducer from './board-reducer';
import modalReducer from './modal-reducer';

/****** Root Reducer ******/
export default combineReducers({
  board: boardReducer,
  firebase: firebaseStateReducer,
  modal: modalReducer
});
