import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/** ------- Helper functions ------ */
import { mapCoordToLocation } from '../../utils/board';

/** ------- Game logic routes ------ */
import { bonusOneGood } from '../../routes/bonus';

/** ------- Constants -------- */
import { PLAY_BONUS } from '../Modal/turn_types';

/** ------- Component -------- */
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
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: PLAY_BONUS });
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
          <text>You played a Goods bonus card. Select 1 good of your choice.</text>
        </div>
        <div id="market-row">
          <img src="./images/cart/fabric.png" onTouchTap={() => this.handleBonusGood('fabric')} />
          <img src="./images/cart/fruits.png" onTouchTap={() => this.handleBonusGood('fruit')} />
          <img src="./images/cart/spices.png" onTouchTap={() => this.handleBonusGood('spice')} />
          <img src="./images/cart/heirlooms.png" onTouchTap={() => this.handleBonusGood('heirloom')} />
        </div>
        <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(PLAY_BONUS)} />
      </div>
    )
  }
};

export default SelectBonusGood;
