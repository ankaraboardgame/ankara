import axios from 'axios';

export const movePlayer = (gameId, playerId, newPosition, possibleMoves) => {
  axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves })
};