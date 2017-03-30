import axios from 'axios';
import { hashHistory } from 'react-router';

/** --------- Constants -------- */
export const SETTING_GAME = 'SETTING_GAME';
export const SETTING_WINNER = 'SETTING_WINNER';

/** --------- Action-creators -------- */
export const settingGame = (id) => ({
  type: SETTING_GAME,
  id
});

/** -------- Thunk dispatchers --------- */

export const fetchNewGame = (roomId, usersMap, userId) => {
  return dispatch => {
    axios.post(`/api/game/${roomId}`, { usersMap, userId })
      .then(() => {
        dispatch(settingGame(roomId));
        hashHistory.push('/game');
      })
      .catch(console.error);
  };
};
