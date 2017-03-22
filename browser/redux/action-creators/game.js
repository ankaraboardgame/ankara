import axios from 'axios';
import { hashHistory } from 'react-router';

/********* CONSTANTS ********/
export const CREATE_GAME = 'CREATE_GAME';

/******* ACTION CREATORS ********/
export const createGame = (id) => ({
    type: CREATE_GAME,
    id
});

/** -------- THUNK-DISPATCHERS --------- */
export const fetchNewGame = (roomId, usersMap) => {

  return dispatch => {

    axios.post(`/api/game/${roomId}`, {usersMap})
      .then(() => {
        dispatch(createGame(roomId));
        hashHistory.push('/game');
      })
      .catch(console.error);
  }

}
