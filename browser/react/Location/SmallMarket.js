import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import SmallMarketRate from './SmallMarketRate'

import { loadModal, hideModal } from '../../redux/action-creators/modals';

class SmallMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/small_market.png`} id="img-location" />
          <SmallMarketRate />
          <p>You are now at the small market. You can trade some goods for money!</p>
          <div id="market-row">
            <img src="./images/cart/fabric.png" />
            <img src="./images/cart/fruits.png" />
            <img src="./images/cart/spices.png" />
            <img src="./images/cart/gems.png" />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(null, mapDispatchToProps)(SmallMarket);
