import React from 'react';
import axios from 'axios';

export const bonusFiveLira = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/fiveLira`)
}

export const bonusOneGood = (gameId, playerId, selectedGood) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/oneGood/${selectedGood}`)
}
