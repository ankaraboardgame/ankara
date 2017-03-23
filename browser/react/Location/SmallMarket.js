import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';

class SmallMarket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentMarketIdx = this.props.gamesRef.smallMarket.currentMarketIdx;
    const currentDemandTile = this.props.gamesRef.smallMarket.demandTiles[currentMarketIdx].img;
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/market/small/${currentDemandTile}`} id="img-location" />
          <p>Select the goods you would like to trade for money!</p>
          <div id="market-row">
            <img src="./images/cart/fabric.png" />
            <img src="./images/cart/fruits.png" />
            <img src="./images/cart/spices.png" />
            <img src="./images/cart/heirlooms.png" />
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
