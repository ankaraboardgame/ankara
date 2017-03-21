import React from 'react';

import Modal from './Modal';

class FabricWarehouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/fabric_warehouse.png`}/>
      </Modal>
    );
  }
}

export default FabricWarehouse;