import React from 'react';

import Modal from './Modal';

class SmallMosque extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/small_mosque.png`}/>
      </Modal>
    );
  }
}

export default SmallMosque;