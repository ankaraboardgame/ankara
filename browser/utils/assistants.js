import { pickupAssistant, dropAssistant } from '../routes/move.js';
import { mapCoordToLocation } from './board.js';

const assistantOnLocation = (currentCoords, {out}) => {
  if (!out) return false;
  const assistantsOut = Object.keys(out).map(key => out[key]);
  return assistantsOut.indexOf(currentCoords) !== -1;
}

export const openAssistantDialog = (props) => {
  if (assistantOnLocation(props.coords, props.merchants[props.user.uid].assistants)) {
    props.openModal(
      mapCoordToLocation(props.coords),
      {
        currentPosition: props.coords,
        dialog: 'pick_up_assistant'
      }
    );
  } else {
    props.openModal(
      mapCoordToLocation(props.coords),
      {
        currentPosition: props.coords,
        dialog: 'drop_assistant',
        assistantCount: props.selfData.assistants.count
      }
    );
  }
}

const merchantsOnLocation = (playerId, currentPosition, merchantsObj) => {
  const merchantsArray = [];
  const merchantIds = Object.keys(merchantsObj);
  merchantIds.forEach((merchantId) => {
    if (merchantId !== playerId && merchantsObj[merchantId].position.coordinates === currentPosition) {
      merchantsArray.push(merchantId);
    }
  });
  return merchantsArray;
};

export function handleAssistant (action) {
  const { gameId, playerId, currentPosition, merchants } = this.props;
  if (action === 'drop'){
    dropAssistant(gameId, playerId, currentPosition);
  } else if (action === 'pickup'){
    pickupAssistant(gameId, playerId, currentPosition);
  }

  this.props.closeModal();

  const otherMerchantsArray = merchantsOnLocation(playerId, currentPosition, merchants);
  // if other merchants are on this location, open the merchants dialog
  if (otherMerchantsArray.length) {
    this.props.openModal(
      mapCoordToLocation(currentPosition),
      {
        currentPosition: currentPosition,
        otherMerchants: otherMerchantsArray,
        merchantCount: otherMerchantsArray.length,
        dialog: 'merchant_encounter' // sends to handleMerchant()
      }
    );
  } else { // else, open the action dialog
    this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
  }
}
