import React from 'react';

/** ------------ Helper functions --------- */
import { mapCoordToLocation } from '../../utils/board';

/** -------------- Constants -------------- */
import { LARGE_MARKET, SMALL_MARKET, GEMSTONE_DEALER, SMALL_MOSQUE, GREAT_MOSQUE } from '../Modal/location_types';

/** -------------- Component -------------- */

/**
 * Conditionally renders views based on its location card.
 * (Some location cards cycle through images dynamically, some are static.)
*/
const Cell = ({ name, coords, smallMarketTile, largeMarketTile, smallMosqueData, greatMosqueData, gemstoneDealerData, handleOnClick }) => {
  const tile = mapCoordToLocation(coords);
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
    {
      (() => {
        switch(tile) {
          case SMALL_MARKET:    return <img src={`images/market/small/${smallMarketTile.img}`} className="img-location"/>;
          case LARGE_MARKET:    return <img src={`images/market/large/${largeMarketTile.img}`} className="img-location"/>;
          case GREAT_MOSQUE:    return <img src={`images/mosque/great/greatMosque_${greatMosqueData.heirloom}_${greatMosqueData.fruit}.jpg`} className="img-location"/>;
          case SMALL_MOSQUE:    return <img src={`images/mosque/small/smallMosque_${smallMosqueData.fabric}_${smallMosqueData.spice}.jpg`} className="img-location"/>;
          case GEMSTONE_DEALER: return <img src={`images/locations/gemstone_dealer_${gemstoneDealerData}.png`} className="img-location" />;
          default:              return <img src={`images/locations/${name}.jpg`} className="img-location"/>;
        };
      })()
    }
    </div>
  );
}

export default Cell;
