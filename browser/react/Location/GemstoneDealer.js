import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyRuby } from '../../routes/location';
import { endTurn } from '../../routes/move';

class GemstoneDealer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyGemEndTurn = this.handleBuyGemEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleBuyGemEndTurn(){
    actionBuyRuby(this.props.gameId, this.props.playerId)
      .then(() => endTurn(this.props.gameId, this.props.playerId))
      .then(() => this.props.closeModal());
  }

  handleEndTurn(){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal());
  }

  render() {
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/gemstone_dealer.png`} id="img-location" />
          <p>All the gems that money can buy.</p>
          <div>
            <RaisedButton label="Buy a gem" style={{ margin: 12 }} primary={true} onTouchTap={this.handleBuyGemEndTurn}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(GemstoneDealer);
