import axios from 'axios';

export const movePlayer = (gameId, playerId, newPosition, possibleMoves) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves })
};

export const endTurn = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/end`)
};
