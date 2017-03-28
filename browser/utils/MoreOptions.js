import { mapCoordToLocation } from './board.js';
import { bonusFiveLira, bonusOneGood } from '../routes/bonus';

// Handle Open More Options Modal// Smuggler - handle pay
export function handleMoreOptionsClick(prevDialog) {
  const nextDialog = prevDialog;
  const currentPosition = this.props.currentPosition;
  this.props.closeModal();
  this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition, nextDialog, dialog: 'more_options' });
}

export function handleGoBackClick(nextDialog) {
  const currentPosition = this.props.currentPosition;
  this.props.closeModal();
  this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
}

export function handleBonusFiveLiraClick(numFiveLira) {
  if(numFiveLira > 0) {
    bonusFiveLira(this.props.gameId, this.props.playerId)
    .catch(console.error)
  }else{
    alert('You do not have any Lira bonus card.') // to be refactored, conditional rendering
  }
}

export function handleBonusOneGoodClick(numOneGood) {
  if(numOneGood > 0) {
    const currentPosition = this.props.currentPosition;
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: 'bonus_select_one_good' });
  }else{
    alert('You do not have any Goods bonus card.') // to be refactored, conditional rendering
  }
}

export function handleBonusGood(selectedGood) {
  bonusOneGood(this.props.gameId, this.props.playerId, selectedGood)
  .then(() => {
    const currentPosition = this.props.currentPosition;
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: 'more_options' });
  })
  .catch(console.error)
}
