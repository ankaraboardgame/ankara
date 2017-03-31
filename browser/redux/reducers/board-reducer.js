/** --------- Action-creators -------- */

import { SET_BOARD } from '../action-creators/board';

/** --------- Initial state -------- */

const initialState = {
  board: null
};

/** --------- Reducer -------- */
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
}

export const getBoard = state => (state.board.board);
