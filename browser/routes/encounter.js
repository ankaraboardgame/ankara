import axios from 'axios';

export const encounterSmuggler = (gameId, playerId, goodWanted, trade) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/encounter/smuggler`, { goodWanted, trade });
};

export const actionPayMerchants = (gameId, playerId, otherMerchantsArray) => {
  return axios.post(
    `api/game/${gameId}/player/${playerId}/encounter/merchant`,
    { ids: otherMerchantsArray }
  );
}
