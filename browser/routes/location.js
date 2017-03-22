'use strict';

import React from 'react';

// 1. Wainwright -- Front end to check if the wheelbarrow is already max size
export const actionBuyWbExt = (gameId, playerId) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/wainwright`)
}

// 2. Warehouse Action: Max Good
export const actionMaxGood = (gameId, playerId, goodType) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/warehouse/${ goodType }`)
}

// 3. Gemstone Dealer
export const actionBuyRuby = (gameId, playerId) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/gemstonedealer`)
}

// 4. Markets
export const actionTradeGoods = (gameId, playerId, marketSize, fabricNum, fruitNum, gemNum, spiceNum) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/market/${marketSize}/${fabricNum}/${fruitNum}/${gemNum}/${spiceNum}`)
}

// 5. Mosques
export const actionBuyMosqueTile = (gameId, playerId, mosqueSize, selectedTile) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/mosque/${mosqueSize}/${selectedTile}`)
}

// 6. Black Market
export const actionBlackMarket = (gameId, playerId, selectedGood, dice1, dice2) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/blackmarket/${selectedGood}/${dice1}/${dice2}`)
}

// 7. Tea house
export const actionTeaHouse = (gameId, playerId, number, dice1, dice2) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/teaHouse/${number}/${dice1}/${dice2}`)
}

// 8. Caravansary
export const actionGetBonusCard = (gameId, playerId, type) => {
  axios.post(`api/game/${gameId}/player/${playerId}/location/caravansary/${type}`)
}
