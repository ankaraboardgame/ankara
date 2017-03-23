import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import RaisedButton from 'material-ui/RaisedButton';
import { actionTradeGoods, actionChangeTile } from '../../routes/location';
import { endTurn } from '../../routes/move';

class LargeMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruit: 0,
      fabric: 0,
      heirloom: 0,
      spice: 0
    }
    this.handleTradeGood = this.handleTradeGood.bind(this);
    this.handleGoodClick = this.handleGoodClick.bind(this);
  }

  handleTradeGood(){
    const playerOffer = this.state;
    const currentMarketIdx = this.props.gamesRef.largeMarket.currentMarketIdx;

    actionTradeGoods(this.props.gameId, this.props.playerId, 'largeMarket', currentMarketIdx, playerOffer.fabric, playerOffer.fruit, playerOffer.heirloom, playerOffer.spice)
      .then(() => {
        actionChangeTile(this.props.gameId, this.props.playerId, 'largeMarket', currentMarketIdx)
      })
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => this.props.closeModal())
      .catch(console.error)
  }

  handleGoodClick(event){
    const good = event.target.id;
    const currentMarketIdx = this.props.gamesRef.largeMarket.currentMarketIdx;
    const currentDemandTile = this.props.gamesRef.largeMarket.demandTiles[currentMarketIdx];
    const currentWheelbarrow = this.props.gamesRef.merchants[this.props.playerId].wheelbarrow;
    let quantity;
    if(this.state[good] < currentDemandTile[good] && this.state[good] < currentWheelbarrow[good]){
      this.setState({
        [event.target.id]: ++this.state[event.target.id]
      })
    }
  }


  render() {
    const style = { margin: 12 };
    const currentMarketIdx = this.props.gamesRef.largeMarket.currentMarketIdx;
    const currentDemandTile = this.props.gamesRef.largeMarket.demandTiles[currentMarketIdx];
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/market/large/${currentDemandTile.img}`} id="img-location" />
          <p>Select the goods you would like to trade for money!</p>
          <div id="market-row">
            <img id="fabric" src="./images/cart/fabric.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fabric}</p>
            <img id="fruit" src="./images/cart/fruits.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fruit}</p>
            <img id="spice" src="./images/cart/spices.png" onTouchTap={this.handleGoodClick} /><p>{this.state.spice}</p>
            <img id="heirloom" src="./images/cart/heirlooms.png" onTouchTap={this.handleGoodClick} /><p>{this.state.heirloom}</p>
            <RaisedButton label="Trade Goods" style={style} primary={true} onTouchTap={this.handleTradeGood}  />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

const mapStateToProps = state => ({
  playerId: state.user.user.uid,
  gameId: state.game.id
});

export default connect(mapStateToProps, mapDispatchToProps)(LargeMarket);
