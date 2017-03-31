'use strict';

import axios from 'axios';

// 1. Wainwright -- Front end to check if the wheelbarrow is already max size
export const actionBuyWbExt = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/wainwright`)
}

// 2. Warehouse Action: Max Good
export const actionMaxGood = (gameId, playerId, goodType) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/warehouse/${ goodType }`);
}

// 3. Gemstone Dealer
export const actionBuyRuby = (gameId, playerId) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/gemstonedealer`);
}

// 4. Markets
export const actionTradeGoods = (gameId, playerId, marketSize, currentMarketIdx, fabricNum, fruitNum, heirloomNum, spiceNum) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/market/${marketSize}/${currentMarketIdx}/${fabricNum}/${fruitNum}/${heirloomNum}/${spiceNum}`);
}

export const actionChangeTile = (gameId, playerId, marketSize, currentMarketIdx) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/market/${marketSize}/${currentMarketIdx}/updateTile`);
}

// 5. Mosques
export const actionBuyMosqueTile = (gameId, playerId, mosqueSize, selectedTile, goodRequired) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/mosque/${mosqueSize}/${selectedTile}/${goodRequired}`);
}

// 6. Black Market
export const actionBlackMarket = (gameId, playerId, selectedGood, diceRoll) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/blackmarket/${selectedGood}/${diceRoll}`)
}

// 7. Tea house
export const actionTeaHouse = (gameId, playerId, number, diceRoll) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/teaHouse/${number}/${diceRoll}`)
}

// 8. Caravansary
export const actionGetBonusCard = (gameId, playerId, type) => {
  return axios.post(`api/game/${gameId}/player/${playerId}/location/caravansary/${type}`);
}
