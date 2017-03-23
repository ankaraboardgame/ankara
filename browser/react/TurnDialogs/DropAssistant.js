import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'

import { endTurn } from '../../routes/move';

class DropAssistant extends React.Component {
  constructor(props) {
    super(props);

    this.handleDropAssistant = this.handleDropAssistant.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleDropAssistant() {
    this.props.closeModal();
    this.props.openModal(MERCHANT_ENCOUNTER, {currentPosition: this.props.currentPosition});
  }

  handleEndTurn() {
    endTurn(this.props.gameId, this.props.userId)
      .then(() => this.props.closeModal());
  }

  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <img onClick={this.handleDropAssistant} src="images/turn_dialogs/drop_assistant.png" id="icon-turn-dialog" />
          <img onClick={this.handleEndTurn} src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog" />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentPosition: state.modal.payload.currentPosition,
  gameId: state.game.id,
  userId: state.user.user.uid,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropAssistant);
