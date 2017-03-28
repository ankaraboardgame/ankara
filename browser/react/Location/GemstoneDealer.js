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
    const { gameId, playerId, handleActionEnd, openModal, closeModal } = this.props;
    actionBuyRuby(gameId, playerId)
      .then(() => handleActionEnd())
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
    const price = this.state.gemPrice;
    const { userMoney, handleActionEnd, handleMoreOptionsClick } = this.props;
    const style = { margin: 12 };

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
          <RaisedButton label="No thanks, I'll end my turn" style={style} primary={true} onTouchTap={handleActionEnd} />
            <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
          </div>
      </div>
    );
  }
}

export default GemstoneDealer;
