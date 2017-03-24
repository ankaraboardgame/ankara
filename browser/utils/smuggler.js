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
  console.log('handle smuggler');
  if (smugglerOnLocation(currentPosition, smuggler)) {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler' });
  } else {
    this.handleEndTurn();
  }
}

// Smuggler - handle decision to talk to smuggler
export function talkToSmuggler() {
  console.log('talkToSmuggler');
  const currentPosition = this.props.currentPosition;
  this.props.closeModal();
  this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler_receive' });
}

// Smuggler - handle receive good and show pay dialog
export function handleSmugglerGoodClick(event) {
  console.log('handleSmugglerGoodClick');
  const good = event.target.id;
  const currentPosition = this.props.currentPosition;
  const currentWheelbarrow = this.props.merchants[this.props.playerId].wheelbarrow;
  //wheelbarrow size validation
  if(currentWheelbarrow[good] < currentWheelbarrow.size) {
    this.props.closeModal();
    this.setState({ smuggler: { goodWanted: good }});

    //pay smuggler with good or 2 lira
    this.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler_pay'});
  }
}

// Smuggler - handle pay
export function handleSmugglerPayClick(event) {
  const trade = event.target.id;
  console.log('handleSmugglerPayClick');

  this.setState({ smuggler: { goodWanted: this.state.smuggler.goodWanted, trade }}, function() {
    console.log('local state', this.state.smuggler);
    encounterSmuggler(this.props.gameId, this.props.playerId, this.state.smuggler.goodWanted, this.state.smuggler.trade)
    .then(this.handleEndTurn);
  });

}

