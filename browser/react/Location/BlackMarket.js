import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBlackMarket } from '../../routes/location';
import { endTurn } from '../../routes/move';

class BlackMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedGood: null }
    this.handleSelectGood = this.handleSelectGood.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleGetBlackMarketGoodsEndTurn = this.handleGetBlackMarketGoodsEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleSelectGood (evt, good){
    this.setState({ selectedGood: good });
  }

  handleDiceRoll (rollSum){
    const good = this.state.selectedGood;
    setTimeout(() => {
      this.handleGetBlackMarketGoodsEndTurn(good, rollSum)
    }, 2000)
  }

  handleGetBlackMarketGoodsEndTurn (selectedGood, rollSum){
    actionBlackMarket(this.props.gameId, this.props.playerId, selectedGood, rollSum)
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleEndTurn (){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  render() {
    const selectedClassName = 'highlighted';
    const selectedGood = this.state.selectedGood;

    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/black_market.png`} id="img-location" />
          <p>Pick up one fabric, spice, or fruit, then roll the dice to see if you get heirlooms!</p>
          <div>
          <div id="market-row">
            <img
              className={selectedGood === 'fabric' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'fabric')}
              src="./images/cart/fabric.png"
            />
            <img
              className={selectedGood === 'fruit' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'fruit')}
              src="./images/cart/fruits.png"
            />
            <img
              className={selectedGood === 'spice' && selectedClassName}
              onClick={(evt) => this.handleSelectGood(evt, 'spice')}
              src="./images/cart/spices.png"
            />
          </div>
          {
            selectedGood &&
            <Dice done={this.handleDiceRoll} />
          }
          <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackMarket);
