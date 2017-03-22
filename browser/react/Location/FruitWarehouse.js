import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';

class FruitWarehouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = { margin: 12 }
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/fruit_warehouse.png`} id="img-location" />
          <p>Look at all the fruits! <br /><br />Your wheelbarrow is now fully loaded with fruits. Come back later if you need more! <br /></p>
          <div>
            <RaisedButton label="Ok, end turn." style={style} primary={true}  />
          </div>
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

export default connect(null, mapDispatchToProps)(FruitWarehouse);
