import { actionPayMerchants } from '../routes/encounter.js';
import { mapCoordToLocation } from './board.js';

export function handleMerchant() {
  const { gameId, playerId, currentPosition, payload } = this.props;
  const { otherMerchantsArray } = payload;
  actionPayMerchants(gameId, playerId, otherMerchantsArray)
  .then(() => {
    this.props.closeModal();
    this.props.openModal(
      mapCoordToLocation(currentPosition),
      {
        currentPosition: currentPosition,
        dialog: 'action' // sends to renderAction()
      }
    );
  })
}
