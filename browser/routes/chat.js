import axios from 'axios';

export const postLobbyChat = (id, name, message) => {
  return axios.post('/api/chat/lobby', {
    id,
    name,
    message
  });
}

export const postGameChat = (gameId, id, name, message) => {
  return axios.post(`/api/chat/game/${gameId}`, {
    id,
    name,
    message
  });
}
