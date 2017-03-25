import axios from 'axios';

export const actionPayMerchants = (gameId, playerId, otherMerchantsArray) => {
  return axios.post(
    `api/game/${gameId}/player/${playerId}/encounter/merchant`,
    { ids: otherMerchantsArray }
  );
}