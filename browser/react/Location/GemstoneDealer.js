import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyRuby } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class GemstoneDealer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gemPrice: null
    };

    this.handleBuyGem = this.handleBuyGem.bind(this);
  }

  componentDidMount (){
    this.setState({ gemPrice: +this.props.gemstoneData });
  }

  handleBuyGem(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyRuby(gameId, playerId)
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error);
  }

  render() {
    const price = this.state.gemPrice;
    return (
      <div>
        <img src={`images/locations/gemstone_dealer_${price}.png`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const price = this.state.gemPrice;
    const { userMoney, handleEndTurn } = this.props;

    return (
      <div id="turn-dialog-half">
        <div id="text-box">
          <p>All the gems that money can buy. Current price: {price} lira.</p>
        </div>
          <div>
            <RaisedButton
              label={`BUY GEM FOR ${price} LIRA`}
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={this.handleBuyGem}
              disabled={userMoney < price}
            />
            <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={handleEndTurn} />
          </div>
      </div>
    );
  }
}

export default GemstoneDealer;
