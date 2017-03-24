import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyWbExt, earnRuby } from '../../routes/location';
import { endTurn } from '../../routes/move';

import { whichDialog, merchantOnLocation, mapCoordToLocation, merchantCount } from '../../utils';

class Wainwright extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyExtension = this.handleBuyExtension.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleBuyExtensionEarnRuby = this.handleBuyExtensionEarnRuby.bind(this);
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

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleBuyExtension(){
    actionBuyWbExt(this.props.gameId, this.props.playerId)
    .then(() => endTurn(this.props.gameId, this.props.playerId))
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  handleBuyExtensionEarnRuby(){
    actionBuyWbExt(this.props.gameId, this.props.playerId)
    .then(() => {
      earnRuby(this.props.gameId, this.props.playerId)
    })
    .then(() => endTurn(this.props.gameId, this.props.playerId))
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  render() {
    const style = { margin: 12 };
    const playerId = this.props.playerId;
    const wheelbarrow = this.props.gamesRef.merchants[playerId].wheelbarrow;
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/wainwright.png`} id="img-location" />
          {
            wheelbarrow.money < 7 ?
            <div>
            <p>Sorry, you do not have enough money at this time. You must end your turn.</p>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
            </div>
            : wheelbarrow.size === 4 ?
            <div>
              <p>You have a wheelbarrow size of 4. You can buy one more extension, and earn a ruby!</p>
              <RaisedButton label="Buy an extension, and end turn" style={style} primary={true} onTouchTap={this.handleBuyExtensionEarnRuby}  />
            </div>
            : wheelbarrow.size === 5 ?
            <div>
              <p>You already have the largest size of wheelbarrow.</p>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
            </div>
            :
            <div>
              <p>You can buy a wheelbarrow extension here.<br /><br />Each extension cost 7 Lira. <br />You can buy a maximum of 3 extensions, <br />at which point you will receive 1 ruby. <br /></p>
              <RaisedButton label="Buy an extension, and end turn" style={style} primary={true} onTouchTap={this.handleBuyExtension}  />
            </div>
          }
          { this.whichDialog(this.props.payload) } // DAN TO CHECK THIS
        </div>
      </Modal>
    );
  }

//   renderAction() {
//     const style = { margin: 12 };
//     const playerId = this.props.playerId;
//     const money = this.props.gamesRef.merchants[playerId].wheelbarrow.money;
//     return (
//       <div>
//         {
//           money < 7 ?
//           <div>
//           <p>Sorry, you do not have enough money at this time. You must end your turn.</p>
//             <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
//           </div>
//           :
//           <div>
//             <p>You can buy a wheelbarrow extension here.<br /><br />Each extension cost 7 Lira. <br />You can buy a maximum of 3 extensions, <br />at which point you will receive 1 ruby. <br /></p>
//             <RaisedButton label="Buy an Extension" style={style} primary={true} onTouchTap={this.handleBuyExtension}  />
//           </div>
//         }
//       </div>
//     );
//   }
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

export default connect(mapStateToProps, mapDispatchToProps)(Wainwright);
