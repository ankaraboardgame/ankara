import axios from 'axios';

export const movePlayer = (playerId, newPosition, possibleMoves) => {
  axios.put(`/api/${playerId}/move`, { newPosition, possibleMoves })
};
