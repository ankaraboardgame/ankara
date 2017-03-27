import { mapCoordToLocation } from '../utils';
import { encounterSmuggler } from '../routes/encounter';

/** Smuggler Logic */

function smugglerOnLocation(currentCoords, smuggler) {
  if (currentCoords === smuggler.coordinates) {
    return true;
  }
  return false;
}

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

export function canTalkToSmuggler(currentUserId, merchantsObj) {
  const wheelbarrow = merchantsObj[currentUserId].wheelbarrow;
  if (isBroke(wheelbarrow) || isFull(wheelbarrow)) {
    return false;
  }
  return true;
}

// Smuggler encounter
export function handleSmuggler() {
  const currentPosition = this.props.currentPosition;
  const smuggler = this.props.gamesRef.smuggler;
  if (smugglerOnLocation(currentPosition, smuggler)) {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler' });
  } else {
    this.handleEndTurn();
  }
}

export function handleSmugglerGoodWantedClick(event) {
  const good = event.target.id;
  this.setState({ smuggler: { goodWanted: good, trade: this.state.smuggler.trade }});
}

export function handleSmugglerGoodToTrade(event) {
  const trade = event.target.id;
  this.setState({ smuggler: { goodWanted: this.state.smuggler.goodWanted, trade }});
}

export function tradeWithSmuggler() {
  encounterSmuggler(this.props.gameId, this.props.playerId, this.state.smuggler.goodWanted, this.state.smuggler.trade)
  .then(this.handleEndTurn);
}
