import axios from 'axios';

export const connectToGame = (userId) => {
  console.log('axios', userId);
  axios.put(`/api/${userId}/lobby/${userId}`)
};
