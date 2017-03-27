import React from 'react';

import { mapCoordToLocation } from '../../utils';

const Cell = props => {
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

function renderOtherTiles(props) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={props.handleOnClick}
    >
      <img src={`images/locations/${props.name}.jpg`} className="img-location" />
      <text className="cell-text">{props.coords}</text>
    </div>
  );
}

function renderGemstoneDealerTile(props) {
  const currentPrice = props.gamesRef.gemstoneDealer;
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={props.handleOnClick}
    >
      <img src={`images/locations/gemstone_dealer_${currentPrice}.png`} className="img-location" />
      <text className="cell-text">{props.coords}</text>
    </div>
  );
}

function renderLargeMarketTiles(props) {
  const currentMarketIdx = props.gamesRef.largeMarket.currentMarketIdx;
  const currentDemandTile = props.gamesRef.largeMarket.demandTiles[currentMarketIdx];

  return (
    <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={props.handleOnClick}
      >
        <img src={`images/market/large/${currentDemandTile.img}`} className="img-location" />
        <text className="cell-text">{props.coords}</text>
    </div>
  );
}

function renderSmallMarketTiles(props) {
  const currentMarketIdx = props.gamesRef.smallMarket.currentMarketIdx;
  const currentDemandTile = props.gamesRef.smallMarket.demandTiles[currentMarketIdx];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={props.handleOnClick}
    >
      <img src={`images/market/small/${currentDemandTile.img}`} className="img-location"/>
      <text className="cell-text">{props.coords}</text>
    </div>
  );
}
