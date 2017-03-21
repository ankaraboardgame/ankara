import axios from 'axios';

/********* CONSTANTS ********/
export const CREATE_GAME = 'CREATE_GAME';

/******* ACTION CREATORS ********/
export const createGame = (id) => ({
    type: CREATE_GAME,
    id
});

/** -------- THUNK-DISPATCHERS --------- */
const fetchNewGame = (users) => {

  const ids = [];
  for (let key in users){
    ids.push(users[key])
  }

  axios.post('/api/game', {ids})
    .then(res => res.data)
    .then(id => {
      createGame(id);
    })
    .catch(console.error);
}
