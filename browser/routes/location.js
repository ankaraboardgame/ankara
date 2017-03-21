'use strict';

import React from 'react';

// Warehouse Action: Max Good
export const maxGood = (playerId, goodType) => {
  axios.post(`api/location/warehouse/${ playerId }/${ goodType }`)
}

// Small Market Action: Trade based on "Currency"
export const tradeGood = (playerId, fabricNum, fruitNum, gemNum, spiceNum) => {
  axios.post(`api/location/smallMarket/${ playerId }/${ fabricNum }/${ fruitNum }/${ gemNum }/${ spiceNum }`)
}
