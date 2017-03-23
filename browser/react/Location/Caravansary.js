import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionCaravansary } from '../../routes/location';
import { endTurn } from '../../routes/move';

class Caravansary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/caravansary.png`} id="img-location" />
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(null, mapDispatchToProps)(Caravansary);
