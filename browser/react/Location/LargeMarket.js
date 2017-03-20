import React from 'react';

import Modal from './Modal';

class LargeMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/large_market.png`}/>
      </Modal>
    );
  }
}

export default LargeMarket;