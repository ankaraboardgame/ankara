import axios from 'axios';

export const log = (gameId, playerId, message) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves })
};
