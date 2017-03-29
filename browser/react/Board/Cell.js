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
const Cell = (props) => {
  const tile = mapCoordToLocation(props.coords);
    switch (tile) {
      case LARGE_MARKET:
        return renderLargeMarketTiles(props);
        break;
      case SMALL_MARKET:
        return renderSmallMarketTiles(props);
        break;
      case GEMSTONE_DEALER:
        return renderGemstoneDealerTile(props);
        break;
      case GREAT_MOSQUE:
        return renderGreatMosqueTiles(props);
        break;
      case SMALL_MOSQUE:
        return renderSmallMosqueTiles(props);
        break;
      default:
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

function renderGreatMosqueTiles({ handleOnClick, coords, greatMosqueData }){
  const tile1 = greatMosqueData.heirloom;
  const tile2 = greatMosqueData.fruit;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
      <img src={`images/mosque/great/greatMosque_${tile1}_${tile2}.jpg`} className="img-location"/>
      <text className="cell-text">{coords}</text>
    </div>
  );
}

function renderSmallMosqueTiles({ handleOnClick, coords, smallMosqueData }){
  const tile1 = smallMosqueData.fabric;
  const tile2 = smallMosqueData.spice;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleOnClick}
    >
      <img src={`images/mosque/small/smallMosque_${tile1}_${tile2}.jpg`} className="img-location"/>
      <text className="cell-text">{coords}</text>
    </div>
  );
}
