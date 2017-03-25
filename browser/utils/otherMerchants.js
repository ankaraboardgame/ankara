import { actionPayMerchants } from '../routes/encounter.js';
import { mapCoordToLocation } from './board.js';

export function handleMerchant() {
  const { gameId, playerId, currentPosition, payload } = this.props;
  const { otherMerchants } = payload;
  actionPayMerchants(gameId, playerId, otherMerchants)
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
