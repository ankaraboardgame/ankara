import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';

class FabricWarehouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = { margin: 12 }
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/fabric_warehouse.png`} id="img-location" />
          <p>Look at all the fabric! <br /><br />Your wheelbarrow is now fully loaded with fabric. Come back later if you need more! <br /></p>
          <div>
            <RaisedButton label="Ok, end turn." style={style} primary={true} onTouchTap={this.props.closeModal}  />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(null, mapDispatchToProps)(FabricWarehouse);
