import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/** ------- Game logic routes ------ */
import { bonusFiveLira, tile2LiraToReturn1Assistant, tile2LiraFor1Good } from '../../routes/bonus';

/** ------- Helper functions ------- */
import { mapCoordToLocation, mapLocationToCoord } from '../../utils/board';
import { getPlayerMosqueTiles } from '../../utils/options';

/** ------- Constants -------- */
import { SELECT_BONUS_GOOD, ACTION, PLAY_BONUS, PLAY_MOSQUES_TILES } from '../Modal/turn_types';

/** ------- Component -------- */
class MoreOptions extends React.Component {
  constructor(props) {
    super(props);

    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  handleGoBackClick(nextDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, dialog: nextDialog });
  }

  render() {
    const { userBonusCards, nextDialog, merchants, playerId, currentPosition, userAbilities } = this.props;
    const abilityCount = getPlayerMosqueTiles(userAbilities).length;

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          {
            !userBonusCards.oneGood && !userBonusCards.fiveLira && !abilityCount ?
            <div>
              <text>You do not have any bonus cards or mosque tiles.</text>
              <RaisedButton label="Go back"
                style={{ margin: 12 }}
                primary={true}
                onTouchTap={() => this.handleGoBackClick(ACTION)}
              />
            </div>
            :
            <div id="options">
              <div id="market-row">
                <RaisedButton label="Bonus Cards" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(PLAY_BONUS)} />
                <RaisedButton label="Mosques Tiles" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(PLAY_MOSQUES_TILES)} />
              </div>
              <RaisedButton label="Go back" style={{ margin: 12 }} primary={true} onTouchTap={() => this.handleGoBackClick(ACTION)} />
            </div>
          }
        </div>
      </div>
    );
  }
};

export default MoreOptions;
