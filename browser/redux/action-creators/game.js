import axios from 'axios';
import { browserHistory } from 'react-router';

/********* CONSTANTS ********/
export const CREATE_GAME = 'CREATE_GAME';

/******* ACTION CREATORS ********/
export const createGame = (id) => ({
    type: CREATE_GAME,
    id
});

/** -------- THUNK-DISPATCHERS --------- */
const fetchNewGame = (roomId, userObj) => {

  const ids = [];
  for (let key in users){
    if (key !== "full")
      ids.push(users[key])
  }

  axios.post(`/api/game/${roomId}`, {ids})
    .then(res => res.data)
    .then(id => {
      createGame(id);
      browserHistory.push('/game');
    })
    .catch(console.error);
}
