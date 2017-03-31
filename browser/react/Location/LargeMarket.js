import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionTradeGoods, actionChangeTile } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class LargeMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruit: 0,
      fabric: 0,
      heirloom: 0,
      spice: 0,
      tradeOffer: false
    };

    this.handleTradeGood = this.handleTradeGood.bind(this);
    this.handleGoodClick = this.handleGoodClick.bind(this);
    this.handleTradeOfferReset = this.handleTradeOfferReset.bind(this);
  }

  handleTradeGood(){
    if (!this.buttonClicked) {
      this.buttonClicked = true;
      const playerOffer = this.state;
      const { largeMarketData, gameId, playerId, handleActionEnd } = this.props;
      const currentMarketIdx = largeMarketData.currentMarketIdx;

      actionTradeGoods(gameId, playerId, 'largeMarket', currentMarketIdx, playerOffer.fabric, playerOffer.fruit, playerOffer.heirloom, playerOffer.spice)
        .then(() => {
          actionChangeTile(gameId, playerId, 'largeMarket', currentMarketIdx)
        })
        .then(() => handleActionEnd())
        .then(() => { this.buttonClicked = false })
        .catch(console.error)
    }
  }

  handleGoodClick(event){
    const { largeMarketTile, userWheelbarrow } = this.props;
    const good = event.target.id;
    let quantity;
    if(this.state[good] < largeMarketTile[good] && this.state[good] < userWheelbarrow[good]){
      this.setState({
        [event.target.id]: ++this.state[event.target.id],
        tradeOffer: true
      })
    }
  }

  handleTradeOfferReset(){
    this.setState({
      fruit: 0,
      fabric: 0,
      heirloom: 0,
      spice: 0,
      tradeOffer: false
    })
  }

  render() {
    const { largeMarketTile } = this.props;

    return (
      <div>
        <img src={`images/market/large/${largeMarketTile.img}`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { handleActionEnd, handleMoreOptionsClick } = this.props;
    const { tradeOffer } = this.state;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <text>Select the goods you would like to trade for money!</text>
        </div>
        <div id="market-row">
          <img id="fabric" src="./images/cart/fabric.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fabric}</p>
          <img id="fruit" src="./images/cart/fruits.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fruit}</p>
          <img id="spice" src="./images/cart/spices.png" onTouchTap={this.handleGoodClick} /><p>{this.state.spice}</p>
          <img id="heirloom" src="./images/cart/heirlooms.png" onTouchTap={this.handleGoodClick} /><p>{this.state.heirloom}</p>
        </div>
        <div id="market-row">
          <RaisedButton label="Trade Goods" style={style} disabled={!tradeOffer} primary={true} onTouchTap={this.handleTradeGood}  />
          <RaisedButton label="Reset" style={style} disabled={!tradeOffer} primary={true} onTouchTap={this.handleTradeOfferReset}  />
        </div>
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
        <RaisedButton label="End turn" style={style} primary={true} onTouchTap={handleActionEnd}  />
      </div>
    );
  }
};

export default LargeMarket;
