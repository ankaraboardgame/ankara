import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBlackMarket } from '../../routes/location';
import { endTurn } from '../../routes/move';
import { whichDialog, merchantOnLocation, mapCoordToLocation, merchantCount } from '../../utils'; 

class BlackMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedGood: null }
    this.handleSelectGood = this.handleSelectGood.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleGetBlackMarketGoodsEndTurn = this.handleGetBlackMarketGoodsEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = this.handleAssistant.bind(this);
    this.handleMerchant = this.handleMerchant.bind(this);
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

  handleSelectGood (evt, good){
    this.setState({ selectedGood: good });
  }

  handleDiceRoll (rollSum){
    const good = this.state.selectedGood;
    setTimeout(() => {
      this.handleGetBlackMarketGoodsEndTurn(good, rollSum)
    }, 2000)
  }

  handleGetBlackMarketGoodsEndTurn (selectedGood, rollSum){
    actionBlackMarket(this.props.gameId, this.props.playerId, selectedGood, rollSum)
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  render() {

    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/black_market.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const selectedClassName = 'highlighted';
    const selectedGood = this.state.selectedGood;

    return (
      <div id="turn-dialog-full">
        <p>Pick up one fabric, spice, or fruit, then roll the dice to see if you get heirlooms!</p>
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
            <RaisedButton label="No thanks, I'll end my turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
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
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackMarket);
