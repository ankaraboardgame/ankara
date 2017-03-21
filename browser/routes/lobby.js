import axios from 'axios';

export const connectToGame = (userId) => {
  axios.put(`/api/lobby/${userId}`)
};
