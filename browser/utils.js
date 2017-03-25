import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from './utils/smuggler';

export function cellActiveStatus(cell, currentPlayerPosition, possibleMoves) {
  const fullView = possibleMoves.concat(currentPlayerPosition);
  return fullView.indexOf(cell) > -1;
}

export function canMovePlayer(cell, possibleMoves) {
  return possibleMoves.indexOf(cell) > -1;
}

import { BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER, GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE, WAINWRIGHT } from './react/Modal/location_types';

export function mapCoordToLocation(coords) {
  const coordsMap = {
    "0,0": GREAT_MOSQUE,
    "1,0": FRUIT_WAREHOUSE,
    "2,0": CARAVANSARY,
    "3,0": LARGE_MARKET,
    "0,1": FABRIC_WAREHOUSE,
    "1,1": SPICE_WAREHOUSE,
    "2,1": SMALL_MARKET,
    "3,1": WAINWRIGHT,
    "0,2": SMALL_MOSQUE,
    "1,2": BLACK_MARKET,
    "2,2": TEA_HOUSE,
    "3,2": GEMSTONE_DEALER
  };

  return coordsMap[coords];
}

export function richEnoughForSmuggler(currentUserId, merchantsObj) {
  const wheelbarrow = merchantsObj[currentUserId].wheelbarrow;
  if (wheelbarrow.fabric > 0 ||
      wheelbarrow.spice > 0 ||
      wheelbarrow.heirloom > 0 ||
      wheelbarrow.fruit > 0 ||
      wheelbarrow.money >= 2) {

    return true;

  }
  return false;
}

export function whichDialog(modalPayload) {
  switch (modalPayload.dialog) {
    case 'drop_assistant':
      return (
        <div id="turn-dialog-half">
            <RaisedButton
              label="Drop an assistant"
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={() => this.handleAssistant('drop')}
              disabled={!modalPayload.assistantCount}
              />
            <RaisedButton
              label="No thanks, I'll end my turn"
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={this.handleEndTurn}
              />
        </div>
      );

    case 'pick_up_assistant':
      return (
        <div id="turn-dialog-half">
          <RaisedButton label="Pick up your assistant" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleAssistant('pickup')}  />
          <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
        </div>
      );

    case 'merchant_encounter':
      return (
        <div id="turn-dialog-half">
          <RaisedButton label={`Pay merchants ${modalPayload.merchantCount * 2} Lira to continue!`} style={{ margin: 12 }} primary={true} onTouchTap={this.handleMerchant}  />
          <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
        </div>
      );

    case 'action':
      return this.renderAction();

    case 'smuggler':
      return (
        <div id="turn-dialog-half">
          <p>Here be the smuggler! <br /><br />You can get a resource of your choice <br /> But! You must give him 2 lira or a random good of your choice in return...</p>
          <div>
            <RaisedButton label={`Talk to smuggler`} style={{ margin: 12 }} primary={true} onTouchTap={() => talkToSmuggler(this)}
              disabled={!richEnoughForSmuggler(this.props.playerId, this.props.merchants)}/>
            <RaisedButton label="End turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
          </div>
        </div>
      );

    case 'smuggler_receive':
      return (
        <div>
          <p>Select the good you would like to receive from smuggler!</p>
          <div id="market-row">
            <img id="fabric" src="./images/cart/fabric.png" onTouchTap={(evt) => handleSmugglerGoodClick(evt, this)} />
            <img id="fruit" src="./images/cart/fruits.png" onTouchTap={(evt) => handleSmugglerGoodClick(evt, this)} />
            <img id="spice" src="./images/cart/spices.png" onTouchTap={(evt) => handleSmugglerGoodClick(evt, this)} />
            <img id="heirloom" src="./images/cart/heirlooms.png" onTouchTap={(evt) => handleSmugglerGoodClick(evt, this)} />
          </div>
        </div>
      )

    case 'smuggler_pay':
      const wheelbarrow = this.props.merchants && this.props.merchants[this.props.playerId].wheelbarrow;
      return (
        <div>
          <p>Select how you would like to pay smuggler</p>
          <div id="market-row">
            { wheelbarrow && wheelbarrow.fabric > 0 &&
              <img id="fabric" src="./images/cart/fabric.png" onTouchTap={(evt) => handleSmugglerPayClick(evt, this)} /> }
            { wheelbarrow && wheelbarrow.fruit > 0 &&
            <img id="fruit" src="./images/cart/fruits.png" onTouchTap={(evt) => handleSmugglerPayClick(evt, this)} /> }
            { wheelbarrow && wheelbarrow.spice > 0 &&
            <img id="spice" src="./images/cart/spices.png" onTouchTap={(evt) => handleSmugglerPayClick(evt, this)} /> }
            { wheelbarrow && wheelbarrow.heirloom > 0 &&
            <img id="heirloom" src="./images/cart/heirlooms.png" onTouchTap={(evt) => handleSmugglerPayClick(evt, this)} /> }
            { wheelbarrow && wheelbarrow.money >= 2 &&
            <img id="twolira" src="./images/money/two_lira.png" onTouchTap={(evt) => handleSmugglerPayClick(evt, this)} /> }
          </div>
        </div>
      )

    default:
      return null;
  }
}


/** ------- GAME WINNER CHECK ---------- */
export function doesSomeoneHaveFiveRubies(merchantsObj) {
  let merchArr = Object.keys(merchantsObj);
  let winner = false;
  merchArr.forEach((merchant) => {
    if (merchantsObj[merchant].wheelbarrow.ruby === 5) winner = true;
  });
  return winner;
}
