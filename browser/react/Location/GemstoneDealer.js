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
    const style = { margin: 12 }
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/gemstone_dealer.png`} id="img-location" />
          <p><em>All the gems that money can buy.</em></p>
          <div>
            <RaisedButton label="Buy a gem." style={style} primary={true} onTouchTap={this.handleBuyGemEndTurn}  />
            <RaisedButton label="No thanks." style={style} primary={true} onTouchTap={this.handleEndTurn}  />
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
