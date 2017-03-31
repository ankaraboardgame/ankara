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
    if (!this.buttonClicked) {
      this.buttonClicked = true;
      const { gameId, playerId, handleActionEnd } = this.props;
      // Make axios call for Caravansary action
      actionGetBonusCard(gameId, playerId, type)
        .then(() => handleActionEnd())
        .then(() => { this.buttonClicked = false })
        .catch(console.error);
    }
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
    const { caravansaryData, handleActionEnd, handleMoreOptionsClick } = this.props;
    const bonusCard = caravansaryData.bonusCards[caravansaryData.index];
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <text>You just drew a bonus card!</text>
        </div>
        <div>
          <img src={`images/bonus_cards/${bonusCard.img}`} />
        </div>
        <div>
          <RaisedButton
            label={'Get Bonus Card'}
            style={style}
            primary={true}
            onTouchTap={() => this.handleGetCard(bonusCard.type)}
          />
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
          <RaisedButton label="End my turn" style={style} primary={true} onTouchTap={handleActionEnd}  />
        </div>
      </div>
    );
  }
};

export default Caravansary;
