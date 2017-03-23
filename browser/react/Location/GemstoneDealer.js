import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyRuby } from '../../routes/location';
import { endTurn } from '../../routes/move';
import { whichDialog, merchantOnLocation, mapCoordToLocation, merchantCount } from '../../utils';

class GemstoneDealer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { gemPrice: null };
    this.handleBuyGemEndTurn = this.handleBuyGemEndTurn.bind(this);
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
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'merchant_encounter'});
    } else {
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
    }
  }

  // Merchant dialogs
  handleMerchant() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
  }

  componentDidMount (){
    this.setState({ gemPrice: +this.props.gameData.gemstoneDealer });
  }

  handleBuyGemEndTurn(){
    actionBuyRuby(this.props.gameId, this.props.playerId)
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => this.props.closeModal());
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
          <img src={`images/locations/gemstone_dealer.png`} id="img-location" />
          { this.whichDialog(this.props.payload) }
          
        </div>
      </Modal>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const price = this.state.gemPrice;
    return (
      <div>
        <p>All the gems that money can buy. Current price: {price} lira.</p>
        <div>
          <RaisedButton label={`BUY GEM FOR ${price} LIRA`} style={style} primary={true} onTouchTap={this.handleBuyGemEndTurn}  />
          <RaisedButton label="No thanks, I'll end my turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  gameData: dataToJS(state.firebase, `games/${state.game.id}`),
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GemstoneDealer);
