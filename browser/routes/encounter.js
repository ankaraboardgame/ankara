import axios from 'axios';

export const encounterSmuggler = (gameId, playerId, goodWanted, trade) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/encounter/smuggler`, { goodWanted, trade });
};
