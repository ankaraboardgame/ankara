import React from 'react';

import { mapCoordToLocation } from '../../utils/board';

/** -------------- Component -------------- */

/**
 * Conditionally renders views based on its location card.
 * (Some location cards cycle through images dynamically, some are static.)
*/
const Cell = (props) => {
  const tile = mapCoordToLocation(props.coords);
    if (tile === 'LARGE_MARKET') {
      return renderLargeMarketTiles(props);
    } else if (tile === 'SMALL_MARKET') {
      return renderSmallMarketTiles(props);
    } else if (tile === 'GEMSTONE_DEALER') {
      return renderGemstoneDealerTile(props);
    } else {
      return renderOtherTiles(props);
    }
}
export default Cell;


/** ---------------- Views ---------------- */
/**
 * Default location tile
 * @param {object} props
 */
function renderOtherTiles({ name, coords, handleOnClick }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
      <img src={`images/locations/${name}.jpg`} className="img-location"/>
      <text className="cell-text">{coords}</text>
    </div>
  );
}

/**
 * Gemstone dealer: image changes based on ruby price
 * @param {object} props
 */
function renderGemstoneDealerTile({ gemstoneDealerData, coords, handleOnClick }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
      <img src={`images/locations/gemstone_dealer_${gemstoneDealerData}.png`} className="img-location" />
      <text className="cell-text">{coords}</text>
    </div>
  );
}

/**
 * Large market: image changes based on current exchange rate
 * @param {object} props
 */
function renderLargeMarketTiles({ handleOnClick, coords, largeMarketData }) {
  const currentMarketIdx = largeMarketData.currentMarketIdx;
  const currentDemandTile = largeMarketData.demandTiles[currentMarketIdx];

  return (
    <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={handleOnClick}
      >
        <img src={`images/market/large/${currentDemandTile.img}`} className="img-location"/>
        <text className="cell-text">{coords}</text>
    </div>
  );
}

/**
 * Small market: image changes based on current exchange rate
 * @param {object} props
 */
function renderSmallMarketTiles({ handleOnClick, coords, smallMarketData }) {
  const currentMarketIdx = smallMarketData.currentMarketIdx;
  const currentDemandTile = smallMarketData.demandTiles[currentMarketIdx];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
      <img src={`images/market/small/${currentDemandTile.img}`} className="img-location"/>
      <text className="cell-text">{coords}</text>
    </div>
  );
}
