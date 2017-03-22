'use strict';

import React from 'react';


// 1. Wainwright -- Front end to check if the wheelbarrow is already max size
export const actionBuyWbExt = () => {
  axios.post(`api/location/wainwright`)
}

// 2. Warehouse Action: Max Good
export const actionMaxGood = (goodType) => {
  axios.post(`api/location/warehouse/${ goodType }`)
}

// 3. Gemstone Dealer
export const actionBuyRuby = () => {
  axios.post(`api/location/gemstonedealer`)
}

// 4. Markets
export const actionTradeGoods = (marketSize, fabricNum, fruitNum, gemNum, spiceNum) => {
  axios.post(`api/location/market/${marketSize}/${fabricNum}/${fruitNum}/${gemNum}/${spiceNum}`)
}

// 5. Mosques
export const actionBuyMosqueTile = (mosqueSize, selectedTile) => {
  axios.post(`api/location/mosque/${mosqueSize}/${selectedTile}`)
}

// 6. Black Market
export const actionBlackMarket = (selectedGood, dice1, dice2) => {
  axios.post(`api/location/blackmarket/${selectedGood}/${dice1}/${dice2}`)
}

// 7. Tea house
export const actionTeaHouse = (number, dice1, dice2) => {
  axios.post(`api/location/teaHouse/${number}/${dice1}/${dice2}`)
}

// 8. Caravansary
export const actionGetBonusCard = (type) => {
  axios.post(`api/location/caravansary/${type}`)
}
