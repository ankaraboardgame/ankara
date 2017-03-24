import axios from 'axios';
import { hashHistory } from 'react-router';

/********* CONSTANTS ********/
export const SETTING_GAME = 'SETTING_GAME';
export const SETTING_WINNER = 'SETTING_WINNER';

/******* ACTION CREATORS ********/
export const settingGame = (id) => ({
    type: SETTING_GAME,
    id
});

export const settingWinner = (winnerId) => ({
    type: SETTING_WINNER,
    winnerId
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
