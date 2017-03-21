import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'
import { mapCoordToLocation } from '../../utils';


class MerchantEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.handleMerchantEncounter = this.handleMerchantEncounter.bind(this);
  }

  handleMerchantEncounter() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition));
  }

  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <img onClick={this.handleMerchantEncounter} src="images/turn_dialogs/pay_merchants.png" id="icon-turn-dialog"/>
          <img src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog"/>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentPosition: state.modal.payload.currentPosition
});

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(hideModal()),
    openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEncounter);
