import React from 'react';

import { mapCoordToLocation } from '../../utils';

const Cell = (props) => {
  const tile = mapCoordToLocation(props.coords);
    if (tile === 'LARGE_MARKET') {
      return renderLargeMarketTiles(props);
    } else if (tile === 'SMALL_MARKET') {
      return renderSmallMarketTiles(props);
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
};

function renderLargeMarketTiles({ handleOnClick, coords, gameData }) {
  const currentMarketIdx = gameData.largeMarket.currentMarketIdx;
  const currentDemandTile = gameData.largeMarket.demandTiles[currentMarketIdx];

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
};

function renderSmallMarketTiles({ handleOnClick, coords, gameData }) {
  const currentMarketIdx = gameData.smallMarket.currentMarketIdx;
  const currentDemandTile = gameData.smallMarket.demandTiles[currentMarketIdx];

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
};
