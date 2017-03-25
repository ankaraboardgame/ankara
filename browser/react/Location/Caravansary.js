import React from 'react';
import { connect } from 'react-redux';
import { dataToJS } from 'react-redux-firebase';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { endTurn } from '../../routes/move';
import { actionGetBonusCard } from '../../routes/location';

import { whichDialog } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';
import { canTalkToSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from '../../utils/smuggler';


/****************** Component ********************/

class Caravansary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smuggler: {
        goodWanted: null,
        trade: null
      }
    }

    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = handleAssistant.bind(this);
    this.handleMerchant = handleMerchant.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleGetCard = this.handleGetCard.bind(this);

    /** smuggler functions */
    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.talkToSmuggler = talkToSmuggler.bind(this);
    this.handleSmugglerGoodClick = handleSmugglerGoodClick.bind(this);
    this.handleSmugglerPayClick = handleSmugglerPayClick.bind(this);
  }

  // Ends Turn
  handleEndTurn (){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleGetCard (type){
    actionGetBonusCard(this.props.gameId, this.props.playerId, type)
      .then(() => this.handleSmuggler())
      .catch(console.error);
  }

  render() {
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/caravansary.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const caravansary = this.props.gamesRef.caravansary;
    const bonusCard = caravansary.bonusCards[caravansary.index];

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You just drew a bonus card!</p>
        </div>
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
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Caravansary);
