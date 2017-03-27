import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionMaxGood } from '../../routes/location';
import { endTurn } from '../../routes/move';

import { whichDialog } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';
import { canTalkToSmuggler, handleSmuggler, handleSmugglerGoodWantedClick, handleSmugglerGoodToTrade, tradeWithSmuggler } from '../../utils/smuggler';

/****************** Component ********************/

class FabricWarehouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smuggler: {
        goodWanted: null,
        trade: null
      }
    }

    this.handleMaxGoodEndTurn = this.handleMaxGoodEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = handleAssistant.bind(this);
    this.handleMerchant = handleMerchant.bind(this);

    /** smuggler functions */
    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.handleSmugglerGoodWantedClick = handleSmugglerGoodWantedClick.bind(this);
    this.handleSmugglerGoodToTrade = handleSmugglerGoodToTrade.bind(this);
    this.tradeWithSmuggler = tradeWithSmuggler.bind(this);

  }

  // Merchant dialogs
  handleMerchant() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
  }

  handleMaxGoodEndTurn(){
    actionMaxGood(this.props.gameId, this.props.playerId, this.props.goodType)
      .then(() => this.handleSmuggler())
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
          <img src={`images/locations/fabric_warehouse.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    return (
      <div id="turn-dialog-half">
        <div className="turn-dialog-column">
          <div id="text-box">
            <p>Look at all the fabric! <br /><br />Come back later if you need more! <br /></p>
          </div>
          <RaisedButton label="Max fabric and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn}  />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  goodType: 'fabric',
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
})

export default connect(mapStateToProps, mapDispatchToProps)(FabricWarehouse);
