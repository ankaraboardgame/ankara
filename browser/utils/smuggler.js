import { mapCoordToLocation } from './board';

/** ------- Constants -------- */
import { SMUGGLER_ENCOUNTER } from '../react/Modal/turn_types';

/** Smuggler Logic */

function isBroke(wheelbarrow) {
  if (wheelbarrow.fabric > 0 ||
      wheelbarrow.spice > 0 ||
      wheelbarrow.heirloom > 0 ||
      wheelbarrow.fruit > 0 ||
      wheelbarrow.money >= 2) {
    return false;
  }
  return true;
}

function isFull(wheelbarrow) {
  if ( wheelbarrow.fabric >= wheelbarrow.size &&
      wheelbarrow.spice >= wheelbarrow.size &&
      wheelbarrow.fruit >= wheelbarrow.size &&
      wheelbarrow.heirloom >= wheelbarrow.size) {
    return true;
  }
  return false;
}

export function canTalkToSmuggler(userWheelbarrow) {
  if (isBroke(userWheelbarrow) || isFull(userWheelbarrow)) {
    return false;
  }
  return true;
}

// Smuggler encounter
export function handleSmuggler() {
  const { currentPosition, closeModal, openModal, smuggler } = this.props;
  console.log('handling smuggler', 'currentPosition', currentPosition, smuggler);
  if (currentPosition === smuggler.coordinates) {
    console.log('smuggler encounter');
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: SMUGGLER_ENCOUNTER });
  }
  else {
    this.handleEndTurn();
  }
}
