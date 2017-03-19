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
  const newGame = new Game('basic');
  return dispatch => {
    dispatch(settingBoard(newGame));
  };
};
