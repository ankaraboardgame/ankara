import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Dice from '../Pieces/Dice';

import { actionBlackMarket } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class BlackMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGood: null,
      rolled: false
    }

    this.handleSelectGood = this.handleSelectGood.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleGetBlackMarketGoodsEndTurn = this.handleGetBlackMarketGoodsEndTurn.bind(this);
  }

  handleSelectGood (evt, good){
    this.setState({ selectedGood: good });
  }

  handleDiceRoll (rollSum){
    // Animate dice roll by setting rolled to true
    this.setState({ rolled: true })
    const { selectedGood } = this.state;
    setTimeout(() => {
      this.handleGetBlackMarketGoodsEndTurn(selectedGood, rollSum)
    }, 1200)
  }

  handleGetBlackMarketGoodsEndTurn (selectedGood, rollSum){
    const { gameId, playerId, handleActionEnd } = this.props;
    // Make axios call for black market action
    actionBlackMarket(gameId, playerId, selectedGood, rollSum)
      .then(() => handleActionEnd())
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <img src={`images/locations/black_market.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const selectedClassName = 'highlighted';
    const { selectedGood, rolled } = this.state;
    const { handleMoreOptionsClick, handleActionEnd, abilities } = this.props;
    const rerollAbility = abilities && abilities.fabric.acquired;

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
        <text>Pick up one fabric, spice, or fruit, then roll the dice to see if you get heirlooms!</text>
        </div>
        <div>
          <div id="market-row">
            <img
              className={selectedGood === 'fabric' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'fabric')}
              src="./images/cart/fabric.png"
            />
            <img
              className={selectedGood === 'fruit' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'fruit')}
              src="./images/cart/fruits.png"
            />
            <img
              className={selectedGood === 'spice' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'spice')}
              src="./images/cart/spices.png"
            />
          </div>
          {
            selectedGood &&
            <Dice done={this.handleDiceRoll} canReroll={rerollAbility} />
          }
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
          <RaisedButton label="End my turn" style={style} primary={true} onTouchTap={handleActionEnd} disabled={rolled} />
        </div>
      </div>
    );
  }
};

export default BlackMarket;
