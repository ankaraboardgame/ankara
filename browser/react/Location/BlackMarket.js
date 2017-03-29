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
    this.setState({ rolled: true })
    const good = this.state.selectedGood;
    setTimeout(() => {
      this.handleGetBlackMarketGoodsEndTurn(good, rollSum)
    }, 2000)
  }

  handleGetBlackMarketGoodsEndTurn (selectedGood, rollSum){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBlackMarket(gameId, playerId, selectedGood, rollSum)
      .then(() => closeModal())
      .then(() => handleEndTurn())
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
    const selectedGood = this.state.selectedGood;
    const { handleMoreOptionsClick, handleEndTurn } = this.props;

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
        <p>Pick up one fabric, spice, or fruit, then roll the dice to see if you get heirlooms!</p>
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
              <Dice done={this.handleDiceRoll} />
            }
          <RaisedButton label="End my turn" style={style} primary={true} onTouchTap={handleEndTurn} disabled={this.state.rolled} />
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
        </div>
      </div>
    );
  }
};

export default BlackMarket;
