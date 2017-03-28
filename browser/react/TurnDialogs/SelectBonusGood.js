import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { mapCoordToLocation } from '../../utils/board';

import { bonusOneGood } from '../../routes/bonus';

/** ------- Constants -------- */
import { MORE_OPTIONS } from '../Modal/turn_types';

class SelectBonusGood extends React.Component {
  constructor(props) {
    super(props);

    this.handleBonusGood = this.handleBonusGood.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  handleBonusGood(selectedGood) {
    const { gameId, playerId, currentPosition, openModal, closeModal } = this.props;
    bonusOneGood(gameId, playerId, selectedGood)
    .then(() => {
      closeModal();
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: MORE_OPTIONS });
    })
    .catch(console.error)
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  render() {
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You played a Goods bonus card. Select 1 good of your choice.</p>
        </div>
        <div id="market-row">
          <img src="./images/cart/fabric.png" onTouchTap={() => this.handleBonusGood('fabric')} />
          <img src="./images/cart/fruits.png" onTouchTap={() => this.handleBonusGood('fruit')} />
          <img src="./images/cart/spices.png" onTouchTap={() => this.handleBonusGood('spice')} />
          <img src="./images/cart/heirlooms.png" onTouchTap={() => this.handleBonusGood('heirloom')} />
        </div>
        <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(MORE_OPTIONS)} />
      </div>
    )
  }
};

export default SelectBonusGood;
