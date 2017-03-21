import React from 'react';

import Modal from './Modal';

class Wainwright extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/wainwright.png`}/>
      </Modal>
    );
  }
}

export default Wainwright;