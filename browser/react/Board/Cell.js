import React from 'react';

import { mapCoordToLocation } from '../../utils/board';
import { LARGE_MARKET, SMALL_MARKET, GEMSTONE_DEALER, SMALL_MOSQUE, GREAT_MOSQUE } from '../Modal/location_types';

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
