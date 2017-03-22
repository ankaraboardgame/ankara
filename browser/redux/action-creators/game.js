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
export const fetchNewGame = (roomId, userObj) => {

  return dispatch => {
    const ids = [];
    for (let key in userObj){
      if (key !== "full")
        ids.push(userObj[key])
    }

    axios.post(`/api/game/${roomId}`, {ids})
      .then(() => {
        dispatch(createGame(roomId));
        hashHistory.push('/game');
      })
      .catch(console.error);
  }

}
