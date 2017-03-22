import axios from 'axios';

export const connectToSession = (userId) => {
  console.log('axios', userId);
  axios.put(`/api/${userId}/lobby/${userId}`)
};

export const startGame = (userId) => {
  console.log('startGame axios', userId);
  axios.post(`/api/${userId}/game`)
  .then(res => res.data)
  .then(data => {
    console.log('response from startGame axios', data);
  })
}
