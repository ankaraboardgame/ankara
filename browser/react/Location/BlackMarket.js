import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBlackMarket } from '../../routes/location';
import { endTurn } from '../../routes/move';

class BlackMarket extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetBlackMarketGoodsEndTurn = this.handleGetBlackMarketGoodsEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleGetBlackMarketGoodsEndTurn(selectedGood, dice1, dice2){
    actionBlackMarket(this.props.gameId, this.props.playerId)
      .then(() => endTurn(this.props.gameId, this.props.playerId, selectedGood, dice1, dice2))
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleEndTurn(){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  render() {
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/black_market.png`} id="img-location" />
          <p>1. Pick up one fabric, spice, or fruit.</p>
          <p>2. Roll for an heirloom (blue good).</p>
          <div>
            <DropDownMenu value={'Select...'}>
              <MenuItem value={'fabric'} primaryText="Fabric" />
              <MenuItem value={'spice'} primaryText="Spice" />
              <MenuItem value={'fruit'} primaryText="Fruit" />
            </DropDownMenu>
            <Dice />
            <RaisedButton label="No thanks" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
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
