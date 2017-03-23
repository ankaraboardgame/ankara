import axios from 'axios';
import { hashHistory } from 'react-router';

/********* CONSTANTS ********/
export const SETTING_GAME = 'SETTING_GAME';

/******* ACTION CREATORS ********/
export const settingGame = (id) => ({
    type: SETTING_GAME,
    id
});

/** -------- THUNK-DISPATCHERS --------- */
export const fetchNewGame = (roomId, usersMap) => {

  return dispatch => {

    axios.post(`/api/game/${roomId}`, {usersMap})
      .then(() => {
        dispatch(settingGame(roomId));
        hashHistory.push('/game');
      })
      .catch(console.error);
  }
}
