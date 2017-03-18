import axios from 'axios';

import { SET_BOARD } from '../action-creators/board';

/******** INITIAL STATE ********/
const initialState = {
  board: null
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {

    case SET_BOARD:
      newState.board = action.board;
      break;

    default:
      return state;

  }

  return newState;
};
