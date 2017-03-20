'use strict';

import React from 'react';

export const maxGood = (playerId, goodType) => {
  axios.put(`api/location/warehouse/${ playerId }/${ goodType }`)
}
