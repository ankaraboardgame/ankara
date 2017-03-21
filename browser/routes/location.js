'use strict';

import React from 'react';

// Warehouse Action: Max Good
export const maxGood = (playerId, goodType) => {
  axios.post(`api/location/warehouse/${ goodType }`)
}

// Small Market Action: Trade based on "Currency"
export const tradeGood = (playerId, fabricNum, fruitNum, gemNum, spiceNum) => {
  axios.post(`api/location/smallMarket/${ fabricNum }/${ fruitNum }/${ gemNum }/${ spiceNum }`)
}
