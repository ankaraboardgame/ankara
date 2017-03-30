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
    if (!this.buttonClicked) {
      this.buttonClicked = true;
      const { gameId, playerId, handleActionEnd } = this.props;
      actionBuyRuby(gameId, playerId)
        .then(() => handleActionEnd())
        .then(() => { this.buttonClicked = false })
        .catch(console.error);
    }
  }

  render() {
    const { gemPrice } = this.state;

    return (
      <div>
        <img src={`images/locations/gemstone_dealer_${gemPrice}.png`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { gemPrice } = this.state;
    const { userMoney, handleActionEnd, handleMoreOptionsClick } = this.props;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-half">
        <div id="text-box">
          <text>All the gems that money can buy. Current price: {gemPrice} lira.</text>
        </div>
          <div id="market-row">
            <RaisedButton
              label={`BUY GEM FOR ${gemPrice} LIRA`}
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={this.handleBuyGem}
              disabled={userMoney < gemPrice}
            /> 
            <RaisedButton label="No thanks, I'll end my turn" style={style} primary={true} onTouchTap={handleActionEnd} />
          </div>
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
      </div>
    );
  }
};

export default GemstoneDealer;
