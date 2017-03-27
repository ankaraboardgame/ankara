import React from 'react';
import axios from 'axios';

// only 2 bonus cards at the moment

export const bonusFiveLira = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/fiveLira`)
}

export const bonusOneGood = (gameId, playerId, selectedGood) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/oneGood/${selectedGood}`)
}
