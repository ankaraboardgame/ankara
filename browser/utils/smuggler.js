import { mapCoordToLocation } from '../utils';

/** Smuggler Logic */

function smugglerOnLocation(currentCoords, smuggler) {
  if (currentCoords === smuggler.coordinates) {
    return true;
  }
  return false;
}

// Smuggler encounter
export function handleSmuggler(context) {
  const currentPosition = context.props.currentPosition;
  const smuggler = context.props.gamesRef.smuggler;
  console.log('handle smuggler');
  if (smugglerOnLocation(currentPosition, smuggler)) {
    context.props.closeModal();
    context.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler' });
  } else {
    context.handleEndTurn();
  }
}

// Smuggler - handle decision to talk to smuggler
export function talkToSmuggler(context) {
  console.log('talkToSmuggler');
  const currentPosition = context.props.currentPosition;
  context.props.closeModal();
  context.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler_receive' });
}

// Smuggler - handle receive good and show pay dialog
export function handleSmugglerGoodClick(event, context) {
  console.log('handleSmugglerGoodClick');
  const good = event.target.id;
  const currentPosition = context.props.currentPosition;
  const currentWheelbarrow = context.props.merchants[context.props.playerId].wheelbarrow;
  //wheelbarrow size validation
  if(currentWheelbarrow[good] < currentWheelbarrow.size) {
    context.props.closeModal();
    //axios to receive chosen good

    //pay smuggler with good or 2 lira
    context.props.openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: 'smuggler_pay'});
  } else {
    //end turn if player was stupidly trying to receive good that you can't carry more.
    context.handleEndTurn();
  }
}

// Smuggler - handle pay and reassignSmuggler(end turn)
export function handleSmugglerPayClick(event, context) {

  console.log('handleSmugglerPayClick');
  if (event.target.id === 'twolira') {
    //pay two lira
    //axios call to decrement two lira
    reassignSmuggler(context);
  } else { //clicked good

    //axios call to decrement good chosen.
    reassignSmuggler(context);
  }
}

// ReassignSmuggler
function reassignSmuggler(context) {
  //axios call to reassignSmuggler
  context.handleEndTurn();
}
