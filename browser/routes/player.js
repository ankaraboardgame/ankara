'use strict';

import axios from 'axios';

export const endTurn = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/end`)
};
