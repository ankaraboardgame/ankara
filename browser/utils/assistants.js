import { pickupAssistant, dropAssistant } from '../routes/move.js';
import { mapCoordToLocation } from './board.js';
import { DROP_ASSISTANT, PICK_UP_ASSISTANT } from '../react/Modal/turn_types';

const assistantOnLocation = (currentCoords, {out}) => {
  if (!out) return false;
  const assistantsOut = Object.keys(out).map(key => out[key]);
  return assistantsOut.indexOf(currentCoords) !== -1;
}

export const openAssistantDialog = (props) => {
  const { coords, merchantsData, userAssistants, openModal } = props;
  if (assistantOnLocation(coords, userAssistants)) {
    openModal(
      mapCoordToLocation(coords),
      {
        currentPosition: coords,
        dialog: PICK_UP_ASSISTANT
      }
    );
  } else {

    openModal(
      mapCoordToLocation(coords),
      {
        currentPosition: coords,
        dialog: DROP_ASSISTANT,
        assistantCount: userAssistants.count
      }
    );
  }
}

export const merchantsOnLocation = (playerId, currentPosition, merchantsObj) => {
  const merchantsArray = [];
  const merchantIds = Object.keys(merchantsObj);
  merchantIds.forEach((merchantId) => {
    if (merchantId !== playerId && merchantsObj[merchantId].position.coordinates === currentPosition) {
      merchantsArray.push(merchantId);
    }
  });
  return merchantsArray;
};
