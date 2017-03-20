import React from 'react';

import Modal from './Modal';

class GemstoneDealer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/gemstone_dealer.png`}/>
      </Modal>
    );
  }
}

export default GemstoneDealer;