import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { bonusFiveLira } from '../../routes/bonus';
import { checkMoney } from '../../utils/options';

import { mapCoordToLocation, mapLocationToCoord } from '../../utils/board';

/** ------- Constants -------- */
import { ACTION, MORE_OPTIONS, SELECT_BONUS_GOOD, PLAY_BONUS } from '../Modal/turn_types';

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
      this.setState({ addText: null })
      bonusFiveLira(gameId, playerId)
      .catch(console.error)
    } else {
      this.setState({
        addText: 'You do not have any Lira bonus card.'
      })
    }
  }

  handleBonusOneGoodClick(numOneGood) {
    const { openModal, closeModal, currentPosition } = this.props;
    if (numOneGood > 0) {
      this.setState({ addText: null })
      closeModal();
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: SELECT_BONUS_GOOD });
    } else {
      this.setState({
        addText: 'You do not have any Goods bonus card.'
      })
    }
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  render() {
    const { userBonusCards, nextDialog, merchants, playerId, currentPosition } = this.props;
    const addText = this.state.addText;
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          {
            <div id="options">
              <div>
                <p>Select the card you want to play.<br /><br />You have {`${userBonusCards.oneGood}`} Goods cards and {`${userBonusCards.fiveLira}`} Lira cards.</p>
                <div id="bonus-row">
                  <div>
                    {
                      <img src="./images/bonus_cards/one-good.png" onTouchTap={() => this.handleBonusOneGoodClick(userBonusCards.oneGood)} />
                    }
                  </div>
                  <div>
                    {
                      <img src="./images/bonus_cards/five-lira.png" onTouchTap={() => this.handleBonusFiveLiraClick(userBonusCards.fiveLira) } />
                    }
                  </div>
                </div>
                {
                  addText &&
                  <p>{addText}</p>
                }
              </div>
            </div>
          }
      </div>
        <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(PLAY_BONUS)} />
    </div>
    )
  }
}

export default BonusCards;