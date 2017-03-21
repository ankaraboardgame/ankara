import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

class GreatMosque extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/great_mosque.png`} id="img-location" />
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(null, mapDispatchToProps)(GreatMosque);
