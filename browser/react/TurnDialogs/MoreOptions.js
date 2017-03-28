import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { bonusFiveLira } from '../../routes/bonus';

import { mapCoordToLocation } from '../../utils/board';

/** ------- Constants -------- */
import { SELECT_BONUS_GOOD } from '../Modal/turn_types';

class MoreOptions extends React.Component {
  constructor(props) {
    super(props);

    this.handleBonusFiveLiraClick = this.handleBonusFiveLiraClick.bind(this);
    this.handleBonusOneGoodClick = this.handleBonusOneGoodClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  handleBonusFiveLiraClick(numFiveLira) {
    const { gameId, playerId } = this.props;
    if (numFiveLira > 0) {
      bonusFiveLira(gameId, playerId)
      .catch(console.error)
    } else {
      alert('You do not have any Lira bonus card.') // to be refactored, conditional rendering
    }
  }

  handleBonusOneGoodClick(numOneGood) {
    const { openModal, closeModal, currentPosition } = this.props;
    if (numOneGood > 0) {
      closeModal();
      openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: SELECT_BONUS_GOOD });
    } else {
      alert('You do not have any Goods bonus card.') // to be refactored, conditional rendering
    }
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  render() {
    const { userBonusCards, nextDialog } = this.props;

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          {
            !userBonusCards.oneGood && !userBonusCards.fiveLira ?
            <div>
              <p>You do not have any bonus cards or mosque tiles.</p>
              <RaisedButton label="Go back"
                style={{ margin: 12 }}
                primary={true}
                onTouchTap={() => this.handleGoBackClick(nextDialog)}
              />
            </div>
            :
            <div>
              <p>You have {`${userBonusCards.oneGood}`} Goods cards and {`${userBonusCards.fiveLira}`} Lira cards. <br />Select the card you want to play.</p>
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
            <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(nextDialog)} />
          </div>
        }
      </div>
    </div>
    );
  }
};

export default MoreOptions;
