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
  const newGame = new Game('basic');
  return dispatch => {
    dispatch(settingBoard(newGame));
  }; 
};
