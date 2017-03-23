import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'

class DropAssistant extends React.Component {
  constructor(props) {
    super(props);

    this.handleDropAssistant = this.handleDropAssistant.bind(this);
  }

  handleDropAssistant() {
    this.props.closeModal();
    this.props.openModal(MERCHANT_ENCOUNTER, {currentPosition: this.props.currentPosition});
  }

  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <img onClick={this.handleDropAssistant} src="images/turn_dialogs/drop_assistant.png" id="icon-turn-dialog"/>
          <img src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog"/>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentPosition: state.modal.payload.currentPosition
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropAssistant);
