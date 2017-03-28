import axios from 'axios';

// export const startGame = gameId => {
//   return axios.post(`/api/game/${gameId}`);
// }

export const createRoom = name => {
  return axios.post(`/api/lobby/create`, { name });
}

export const addToRoom = (roomId, userId, name) => {
  return axios.post(`/api/lobby/join`, { roomId, userId, name });
}

export const removeFromRoom = (roomId, userId) => {
  return axios.post(`/api/lobby/leave`, { roomId, userId, name });
}

export const deleteRoom = roomId => {
  return axios.post(`api/lobby/${roomId}/delete`);
}