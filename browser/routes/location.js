'use strict';

import React from 'react';

// Warehouse Action: Max Good
export const maxGood = (playerId, goodType) => {
  axios.post(`api/location/warehouse/${ playerId }/${ goodType }`)
}

// Small Market Action: Trade based on "Currency"
export const tradeGood = (playerId, tradeOffer) => {
  axios.post(`api/location/smallMarket/${ playerId }/tradeOffer`)
}
