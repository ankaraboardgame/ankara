import axios from 'axios';

export const movePlayer = (playerId, newPosition) => {
  axios.put(`/api/${playerId}/move/${newPosition}`)
};
