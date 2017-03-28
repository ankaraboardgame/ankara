import React from 'react';

import { mapCoordToLocation } from '../../utils/board';

/** -------- Container ---------- */
/**
 * Conditionally renders contents based on its location card.
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
