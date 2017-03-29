import React from 'react';
import axios from 'axios';

// only 2 bonus cards at the moment

export const bonusFiveLira = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/fiveLira`)
}

export const bonusOneGood = (gameId, playerId, selectedGood) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/oneGood/${selectedGood}`)
}

export const tileAdd1Assistant = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/add1Assistant`)
}

export const tile2LiraFor1Good = (gameId, playerId, selectedGood) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/2LiraFor1Good`, { goodWanted: selectedGood })
}

export const tiledieTurnOrRoll = (gameId, playerId) => {

}

export const tile2LiraToReturn1Assistant = (gameId, playerId, assistantCoords) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/bonus/2LiraToReturn1Assistant/${assistantCoords}`)
}
