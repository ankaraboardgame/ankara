import React from 'react';

import Modal from './Modal';

class SmallMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/small_market.png`}/>
      </Modal>
    );
  }
}

export default SmallMarket;