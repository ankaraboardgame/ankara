import {
  BLACK_MARKET,
  CARAVANSARY,
  FABRIC_WAREHOUSE,
  FRUIT_WAREHOUSE,
  GEMSTONE_DEALER,
  GREAT_MOSQUE,
  LARGE_MARKET,
  SMALL_MARKET,
  SMALL_MOSQUE,
  SPICE_WAREHOUSE,
  TEA_HOUSE,
  WAINWRIGHT
} from '../react/Modal/location_types';

/*
* Long game
*/
var coordsMap = {
  '0,0': SPICE_WAREHOUSE,
  '1,0': BLACK_MARKET,
  '2,0': SMALL_MARKET,
  '3,0': FRUIT_WAREHOUSE,
  '0,1': GREAT_MOSQUE,
  '1,1': CARAVANSARY,
  '2,1': TEA_HOUSE,
  '3,1': SMALL_MOSQUE,
  '0,2': FABRIC_WAREHOUSE,
  '1,2': LARGE_MARKET,
  '2,2': WAINWRIGHT,
  '3,2': GEMSTONE_DEALER
};

export function mapCoordToLocation(coords) {
  return coordsMap[coords];
}

export function mapLocationToCoord(location) {
  const locationName = location.toUpperCase().split(' ').join('_');
  let locationCoord = undefined;
  for(let coord in coordsMap){
    if(coordsMap[coord] === locationName) locationCoord = coord;
  }
  return locationCoord;
}

export function cellActiveStatus(cell, currentPlayerPosition, possibleMoves) {
  const fullView = possibleMoves.concat(currentPlayerPosition);
  return fullView.indexOf(cell) > -1;
}

export function canMovePlayer(cell, possibleMoves) {
  return possibleMoves.indexOf(cell) > -1;
}

/** ------- GAME WINNER CHECK ---------- */
export function doesSomeoneHaveFiveRubies(merchantsObj) {
  let merchArr = Object.keys(merchantsObj);
  let winner = false;
  merchArr.forEach((merchant) => {
    if (merchantsObj[merchant].wheelbarrow.ruby === 5) winner = true;
  });
  return winner;
}
