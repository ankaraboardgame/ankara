import React from 'react';

import Modal from './Modal';

class TeaHouse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <img src={`images/locations/tea_house.png`}/>
      </Modal>
    );
  }
}

export default TeaHouse;