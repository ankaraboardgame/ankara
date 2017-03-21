import axios from 'axios';

export const movePlayer = (playerId, newPosition, possibleMoves) => {
  axios.put(`/api/game/gameOne/player/${playerId}/move`, { newPosition, possibleMoves })
};
