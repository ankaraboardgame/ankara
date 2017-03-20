import React from 'react';

import Modal from './Modal';

class GreatMosque extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/great_mosque.png`}/>
      </Modal>
    );
  }
}

export default GreatMosque;