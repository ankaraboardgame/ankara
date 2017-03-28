import axios from 'axios';

<<<<<<< HEAD
export const startGame = gameId => {
  return axios.post(`/api/game/${gameId}`);
=======
export const connectToSession = (userId) => {
  console.log('axios', userId);
  axios.put(`/api/${userId}/lobby/${userId}`)
};

export const startGame = (userId) => {
  axios.post(`/api/${userId}/game`)
  .then(res => res.data)
  .then(data => {
    console.log('response from startGame axios', data);
  })
>>>>>>> 4f6f32f398957bda2659a919bf5c8fb2f23c5541
}

export const createRoom = name => {
  return axios.post(`/api/lobby/create`, { name });
}

export const joinRoom = (roomId, userId, name) => {
  return axios.post(`/api/lobby/join`, { roomId, userId, name });
}

export const deleteRoom = roomId => {
  return axios.post(`api/lobby/${roomId}/delete`);
}