import { Game } from '../../game';

/** ------- Constants ------- */

export const SET_BOARD = 'SET_BOARD';

/** ------- Action-creators ------- */

const settingBoard = board => ({
  type: SET_BOARD,
  board
});

/** ------- Thunk dispatchers ------- */

export const loadBoard = () => {
  // for custom board, axios to backend to ask for board configuration
  // then take the data and pass in to Game constructor
  const newGame = new Game('long');
  return dispatch => {
    dispatch(settingBoard(newGame));
  }
};
