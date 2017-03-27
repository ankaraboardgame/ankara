import React from 'react';
import { connect } from 'react-redux';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import RaisedButton from 'material-ui/RaisedButton';
import { actionTradeGoods, actionChangeTile } from '../../routes/location';
import { endTurn } from '../../routes/move';

import { whichDialog, handleEndTurn, beforeEndTurn } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';
import { canTalkToSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from '../../utils/smuggler';

/****************** Component ********************/
class SmallMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruit: 0,
      fabric: 0,
      heirloom: 0,
      spice: 0,
      tradeOffer: false,
      smuggler: {
        goodWanted: null,
        trade: null
      }
    };


    this.handleTradeGood = this.handleTradeGood.bind(this);
    this.handleGoodClick = this.handleGoodClick.bind(this);
    this.whichDialog = whichDialog.bind(this);
    this.handleEndTurn = handleEndTurn.bind(this);
    this.beforeEndTurn = beforeEndTurn.bind(this);
    this.handleAssistant = handleAssistant.bind(this);
    this.handleMerchant = handleMerchant.bind(this);
    this.handleTradeOfferReset = this.handleTradeOfferReset.bind(this);

    /** smuggler functions */
    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.talkToSmuggler = talkToSmuggler.bind(this);
    this.handleSmugglerGoodClick = handleSmugglerGoodClick.bind(this);
    this.handleSmugglerPayClick = handleSmugglerPayClick.bind(this);
  }

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleTradeGood(){
    const playerOffer = this.state;
    const currentMarketIdx = this.props.gameData.smallMarket.currentMarketIdx;

    actionTradeGoods(this.props.gameId, this.props.playerId, 'smallMarket', currentMarketIdx, playerOffer.fabric, playerOffer.fruit, playerOffer.heirloom, playerOffer.spice)
      .then(() => {
        actionChangeTile(this.props.gameId, this.props.playerId, 'smallMarket', currentMarketIdx)
      })
      .then(this.beforeEndTurn)
      .catch(console.error)
  }

  handleGoodClick(event){
    const good = event.target.id;
    const currentMarketIdx = this.props.gameData.smallMarket.currentMarketIdx;
    const currentDemandTile = this.props.gameData.smallMarket.demandTiles[currentMarketIdx];
    const currentWheelbarrow = this.props.gameData.merchants[this.props.playerId].wheelbarrow;
    let quantity;
    if(this.state[good] < currentDemandTile[good] && this.state[good] < currentWheelbarrow[good]){
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
    const currentMarketIdx = this.props.gameData.smallMarket.currentMarketIdx;
    const currentDemandTile = this.props.gameData.smallMarket.demandTiles[currentMarketIdx];
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/market/small/${currentDemandTile.img}`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>Select the goods you would like to trade for money!</p>
        </div>
        <div id="market-row">
          <img id="fabric" src="./images/cart/fabric.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fabric}</p>
          <img id="fruit" src="./images/cart/fruits.png" onTouchTap={this.handleGoodClick} /><p>{this.state.fruit}</p>
          <img id="spice" src="./images/cart/spices.png" onTouchTap={this.handleGoodClick} /><p>{this.state.spice}</p>
          <img id="heirloom" src="./images/cart/heirlooms.png" onTouchTap={this.handleGoodClick} /><p>{this.state.heirloom}</p>
        </div>
        <div id="market-row">
          <RaisedButton label="Trade Goods" style={style} disabled={!this.state.tradeOffer} primary={true} onTouchTap={this.handleTradeGood}  />
          <RaisedButton label="Reset" style={style} disabled={!this.state.tradeOffer} primary={true} onTouchTap={this.handleTradeOfferReset}  />
        </div>
        <RaisedButton label="End turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SmallMarket);
