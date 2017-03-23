import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyWbExt } from '../../routes/location';

class Wainwright extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyExtension = this.handleBuyExtension.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleEndTurn(){
    console.log('need to add end turn')
    this.props.closeModal()
  }

  handleBuyExtension(){
    actionBuyWbExt(this.props.gameId, this.props.playerId)
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  render() {
    const style = { margin: 12 };
    const playerId = this.props.playerId;
    const money = this.props.gamesRef.merchants[playerId].wheelbarrow.money;
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/wainwright.png`} id="img-location" />
          {
            money < 7 ?
            <div>
            <p>Sorry, you do not have enough money at this time. You must end your turn.</p>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn}  />
            </div>
            :
            <div>
              <p>You can buy a wheelbarrow extension here.<br /><br />Each extension cost 7 Lira. <br />You can buy a maximum of 3 extensions, <br />at which point you will receive 1 ruby. <br /></p>
              <RaisedButton label="Buy an Extension" style={style} primary={true} onTouchTap={this.handleBuyExtension}  />
            </div>
          }
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid
})

export default connect(mapStateToProps, mapDispatchToProps)(Wainwright);
