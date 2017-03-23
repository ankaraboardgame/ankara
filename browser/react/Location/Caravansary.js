import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionGetBonusCard } from '../../routes/location';
import { endTurn } from '../../routes/move';

class Caravansary extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetCard = this.handleGetCard.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleGetCard (type){
    actionGetBonusCard(this.props.gameId, this.props.playerId, type)
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
    const caravansary = this.props.gamesRef.caravansary;
    const bonusCard = caravansary.bonusCards[caravansary.index];
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={'images/locations/caravansary.png'} id="img-location" />
          <p>You just drew a bonus card!</p>
          <div>
            <img src={`images/bonus_cards/${bonusCard.img}`} />
          </div>
          <div>
            <RaisedButton
              label={'Get Bonus Card'}
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={() => this.handleGetCard(bonusCard.type)}
            />
            <RaisedButton label="End my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Caravansary);
