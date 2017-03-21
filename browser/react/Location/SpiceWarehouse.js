import React from 'react';

import Modal from './Modal';

class SpiceWarehouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/spice_warehouse.png`}/>
      </Modal>
    );
  }
}

export default SpiceWarehouse;