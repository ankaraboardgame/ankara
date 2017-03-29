import axios from 'axios';

// export const startGame = gameId => {
//   return axios.post(`/api/game/${gameId}`);
// }

export const createRoom = (name, userId) => {
  return axios.post(`/api/lobby/create`, {
    name,
    creator: userId
  });
}

export const addToRoom = (roomId, userId, name) => {
  return axios.post(`/api/lobby/join`, { roomId, userId, name });
}

export const removeFromRoom = (roomId, userId) => {
  return axios.post(`/api/lobby/leave`, { roomId, userId });
}

export const deleteRoom = roomId => {
  return axios.post(`api/lobby/${roomId}/delete`);
}

export const signalReady = (roomId, userId) => {
  return axios.post(`api/lobby/${roomId}/ready`, { userId });
}