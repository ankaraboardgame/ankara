import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { bonusFiveLira } from '../../routes/bonus';

import { mapCoordToLocation } from '../../utils/board';

/** ------- Constants -------- */
import { SELECT_BONUS_GOOD, ACTION } from '../Modal/turn_types';

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
    const { userBonusCards, nextDialog, smallMosqueData, greatMosqueData, merchants, playerId } = this.props;
    const playerAbilities = merchants[playerId].abilities;
    let abilityCount = 0;
    let tileArray = [];
    for(let ability in playerAbilities){
      if(playerAbilities[ability].acquired){
        abilityCount++;
        tileArray.push(playerAbilities[ability].img);
      }
    }

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          {
            !userBonusCards.oneGood && !userBonusCards.fiveLira && !abilityCount ?
            <div>
              <p>You do not have any bonus cards or mosque tiles.</p>
              <RaisedButton label="Go back"
                style={{ margin: 12 }}
                primary={true}
                onTouchTap={() => this.handleGoBackClick(ACTION)}
              />
            </div>
            :
            <div id="options">
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
              </div>
              <div>
                <p>You have acquired {abilityCount} Mosque tiles.</p>
                <div id="bonus-row">
                  {
                    tileArray !== [] && tileArray.map((imgStr, idx) => {
                      return (
                        <img key={idx} src={imgStr} />
                      )
                    })
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
