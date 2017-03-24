import React from 'react';
import { connect } from 'react-redux';
import { dataToJS } from 'react-redux-firebase';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { endTurn } from '../../routes/move';
import { actionGetBonusCard } from '../../routes/location';

import { whichDialog } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';


/****************** Component ********************/

class Caravansary extends React.Component {
  constructor(props) {
    super(props);

    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = this.handleAssistant.bind(this);
    this.handleMerchant = this.handleMerchant.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleGetCard = this.handleGetCard.bind(this);
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
  handleEndTurn (){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleGetCard (type){
    actionGetBonusCard(this.props.gameId, this.props.playerId, type)
      .then(() => this.props.closeModal())
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .catch(console.error);
  }  

  render() {
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/caravansary.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }          
        </div>
      </Modal>
    );
  }

  renderAction() {
    const caravansary = this.props.gamesRef.caravansary;
    const bonusCard = caravansary.bonusCards[caravansary.index];

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You just drew a bonus card!</p>
        </div>
        <div>
          <img src={`images/bonus_cards/${bonusCard.img}`} />
        </div>
        <div>
          <RaisedButton
            label={'Get Bonus Card'}
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={() => this.handleGetCard(bonusCard.type)}
          />
          <RaisedButton label="End my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Caravansary);
