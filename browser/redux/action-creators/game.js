import axios from 'axios';
import { hashHistory } from 'react-router';

/** --------- Constants -------- */
export const SETTING_GAME = 'SETTING_GAME';
export const SETTING_WINNER = 'SETTING_WINNER';
export const REMOVING_GAME = 'REMOVING_GAME';

/** --------- Action-creators -------- */
export const settingGame = id => ({
  type: SETTING_GAME,
  id
});

export const removingGame = () => ({
  type: REMOVING_GAME
})

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

export const endGame = (gameId, userId) => {
  return dispatch => {
    axios.post(`/api/game/${gameId}/end`, { userId })
      .then(() => {
        dispatch(removingGame());
        hashHistory.push('/');
      })
      .catch(console.error);
  };
};