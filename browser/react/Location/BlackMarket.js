import React from 'react';

import Modal from './Modal';

class BlackMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/black_market.png`}/>
      </Modal>
    );
  }
}

export default BlackMarket;