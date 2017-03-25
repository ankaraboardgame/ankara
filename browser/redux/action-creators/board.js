import { Game } from '../../game';

/** ------- CONSTANTS ------- */

export const SET_BOARD = 'SET_BOARD';

/** ------- ACTION-CREATORS ------- */

const settingBoard = board => ({
  type: SET_BOARD,
  board
});

/** ------- THUNK ACTIONS ------- */

export const loadBoard = () => {
  // for custom board, axios to backend to ask for board configuration
  // then take the data and pass in to Game constructor
  const newGame = new Game('basic');
  return dispatch => {
    dispatch(settingBoard(newGame));
  }
};
