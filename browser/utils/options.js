import { mapCoordToLocation } from './board';

export function assistantsOutLocations(assistantsOutObj){
  let assistantsOutLocationsArray = [];
  for (let assistant in assistantsOutObj){
    assistantsOutLocationsArray.push(mapCoordToLocation(assistantsOutObj[assistant]).split('_').join(' ').toLowerCase());
  }
  return assistantsOutLocationsArray;
}

export function getPlayerMosqueTiles(playerAbilitiesObj){
  let tileArray = [];
  for (let ability in playerAbilitiesObj){
    if (playerAbilitiesObj[ability].acquired){
      tileArray.push(playerAbilitiesObj[ability]);
    }
  }
  return tileArray;
}

export function checkMoneyAndGoods(wheelbarrow, good){
  return wheelbarrow.money >= 2 ?
  wheelbarrow[good] < wheelbarrow.size ? true : false
  : false;
}

export function checkMoney(money){
  if (money >= 2) return true;
  else return false;
}

export function checkWarehouseCondition(currentPosition){
  let condition = false;
  const currentLocation = mapCoordToLocation(currentPosition);
  if (currentLocation === 'FRUIT_WAREHOUSE' || currentLocation === 'FABRIC_WAREHOUSE' || currentLocation === 'SPICE_WAREHOUSE'){
    condition = true;
  }
  return condition;
}
