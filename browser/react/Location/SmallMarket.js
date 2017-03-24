import React from 'react';
import { connect } from 'react-redux';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import RaisedButton from 'material-ui/RaisedButton';
import { actionTradeGoods, actionChangeTile } from '../../routes/location';
import { endTurn } from '../../routes/move';
import { whichDialog, merchantOnLocation, mapCoordToLocation, merchantCount, smugglerOnLocation, richEnoughForSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick, reassignSmuggler} from '../../utils';

class SmallMarket extends React.Component {
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
    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = this.handleAssistant.bind(this);
    this.handleMerchant = this.handleMerchant.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);

  }

  // Assistant dialogs
  handleAssistant() {
    this.props.closeModal();
    if (merchantOnLocation(this.props.playerId, this.props.currentPosition, this.props.merchants)) {
      let numMerchants = merchantCount(this.props.playerId, this.props.currentPosition, this.props.merchants);
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { merchantCount: numMerchants, currentPosition: this.props.currentPosition, dialog: 'merchant_encounter'});
    } else {
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
    }
  }

  // Merchant dialogs
  handleMerchant() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
  }

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleTradeGood(){
    const playerOffer = this.state;
    const currentMarketIdx = this.props.gamesRef.smallMarket.currentMarketIdx;

    actionTradeGoods(this.props.gameId, this.props.playerId, 'smallMarket', currentMarketIdx, playerOffer.fabric, playerOffer.fruit, playerOffer.heirloom, playerOffer.spice)
      .then(() => {
        actionChangeTile(this.props.gameId, this.props.playerId, 'smallMarket', currentMarketIdx)
      })
      // .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => handleSmuggler(this))
      .catch(console.error)
  }

  handleGoodClick(event){
    const good = event.target.id;
    const currentMarketIdx = this.props.gamesRef.smallMarket.currentMarketIdx;
    const currentDemandTile = this.props.gamesRef.smallMarket.demandTiles[currentMarketIdx];
    const currentWheelbarrow = this.props.gamesRef.merchants[this.props.playerId].wheelbarrow;
    let quantity;
    if(this.state[good] < currentDemandTile[good] && this.state[good] < currentWheelbarrow[good]){
      this.setState({
        [event.target.id]: ++this.state[event.target.id]
      })
    }
  }

  render() {
    const currentMarketIdx = this.props.gamesRef.smallMarket.currentMarketIdx;
    const currentDemandTile = this.props.gamesRef.smallMarket.demandTiles[currentMarketIdx];
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
          <RaisedButton label="Trade Goods" style={style} primary={true} onTouchTap={this.handleTradeGood}  />
        </div>
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
