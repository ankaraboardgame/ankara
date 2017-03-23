import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'
import { mapCoordToLocation } from '../../utils';
import { endTurn } from '../../routes/move';


class MerchantEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.handleMerchantEncounter = this.handleMerchantEncounter.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleMerchantEncounter() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition));
  }

  handleEndTurn() {
    endTurn(this.props.gameId, this.props.userId)
      .then(() => this.props.closeModal());
  }


  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <text>You must pay { this.props.merchantCount * 2 } lira!</text>
          <img onClick={this.handleMerchantEncounter} src="images/turn_dialogs/pay_merchants.png" id="icon-turn-dialog"/>
          <img onClick={this.handleEndTurn} src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog"/>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentPosition: state.modal.payload.currentPosition,
  gameId: state.game.id,
  userId: state.user.user.uid,
  merchantCount: state.modal.payload.merchCount
});

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(hideModal()),
    openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEncounter);
