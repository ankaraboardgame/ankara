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
export const fetchNewGame = (roomId, userObj) => {

  return dispatch => {
    const ids = [];
    for (let key in userObj){
      if (key !== "full")
        ids.push(userObj[key])
    }

    axios.post(`/api/game/${roomId}`, {ids})
      .then(() => {
        dispatch(settingGame(roomId));
        hashHistory.push('/game');
      })
      .catch(console.error);
  }
}
