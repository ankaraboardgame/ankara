import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionGetBonusCard } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class Caravansary extends React.Component {
  constructor(props) {
    super(props);

    this.handleGetCard = this.handleGetCard.bind(this);
  }

  handleGetCard (type){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionGetBonusCard(gameId, playerId, type)
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <img src={`images/locations/caravansary.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { caravansaryData, handleEndTurn } = this.props;
    const bonusCard = caravansaryData.bonusCards[caravansaryData.index];

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You just drew a bonus card!</p>
        </div>
        <div>
          <img src={`images/bonus_cards/${bonusCard.img}`} />
        </div>
        <div>
          <RaisedButton
            label={'Get Bonus Card'}
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={() => this.handleGetCard(bonusCard.type)}
          />
          <RaisedButton label="End my turn" style={{ margin: 12 }} primary={true} onTouchTap={handleEndTurn}  />
        </div>
      </div>
    );
  }
}

export default Caravansary;
