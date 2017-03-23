'use strict';

import axios from 'axios';

export const endTurn = (gameId, playerId) => {
  axios.post(`/api/game/${gameId}/player/${playerId}/end`)
};
