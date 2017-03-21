import React from 'react';

import Modal from './Modal';

class FruitWarehouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/fruit_warehouse.png`}/>
      </Modal>
    );
  }
}

export default FruitWarehouse;