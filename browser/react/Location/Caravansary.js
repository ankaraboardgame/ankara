import React from 'react';

import Modal from './Modal';

class Caravansary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/caravansary.png`}/>
      </Modal>
    );
  }
}

export default Caravansary;