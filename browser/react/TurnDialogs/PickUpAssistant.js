import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'


class PickUpAssistant extends React.Component {
  constructor(props) {
    super(props);

    this.handlePickUpAssistant = this.handlePickUpAssistant.bind(this);
  }

  handlePickUpAssistant() {
    this.props.closeModal();
    this.props.openModal(MERCHANT_ENCOUNTER);
  }

  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <img onClick={this.handlePickUpAssistant} src="images/turn_dialogs/pick_up_assistant.png" id="icon-turn-dialog"/>
          <img src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog"/>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(hideModal()),
        openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
    }
};

export default connect(null, mapDispatchToProps)(PickUpAssistant);
