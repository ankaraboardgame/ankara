import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/** ------- Game logic routes ------ */
import { bonusFiveLira } from '../../routes/bonus';
import { checkMoney } from '../../utils/options';

/** ------- Helper functions ------- */
import { mapCoordToLocation, mapLocationToCoord } from '../../utils/board';

/** ------- Constants -------- */
import { MORE_OPTIONS, SELECT_BONUS_GOOD } from '../Modal/turn_types';

/** ------- Component -------- */
class BonusCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: null
    }

    this.handleBonusFiveLiraClick = this.handleBonusFiveLiraClick.bind(this);
    this.handleBonusOneGoodClick = this.handleBonusOneGoodClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  handleBonusFiveLiraClick(numFiveLira) {
    const { gameId, playerId } = this.props;
    if (numFiveLira > 0) {
      this.setState({ addText: null });
      bonusFiveLira(gameId, playerId)
        .catch(console.error)
    } else {
      this.setState({
        addText: 'You do not have any Lira bonus card.'
      });
    }
  }

  handleBonusOneGoodClick(numOneGood) {
    const { openModal, closeModal, currentPosition } = this.props;
    if (numOneGood > 0) {
      this.setState({ addText: null });
      closeModal();
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: SELECT_BONUS_GOOD });
    } else {
      this.setState({
        addText: 'You do not have any Goods bonus card.'
      });
    }
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  render() {
    const { userBonusCards, nextDialog, merchants, playerId, currentPosition } = this.props;
    const { addText } = this.state;
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <div id="options">
            <div>
              <text>Select the card you want to play.<br /><br />You have {`${userBonusCards.oneGood}`} Goods cards and {`${userBonusCards.fiveLira}`} Lira cards.</text>
              <div id="bonus-row">
                <div>
                  <img src="./images/bonus_cards/one-good.png" onTouchTap={() => this.handleBonusOneGoodClick(userBonusCards.oneGood)} />
                </div>
                <div>
                  <img src="./images/bonus_cards/five-lira.png" onTouchTap={() => this.handleBonusFiveLiraClick(userBonusCards.fiveLira) } />
                </div>
              </div>
              { addText && <text>{addText}</text> }
            </div>
          </div>
      </div>
        <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(MORE_OPTIONS)} />
    </div>
    );
  }
};

export default BonusCards;
