import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionTeaHouse } from '../../routes/location';
import { endTurn } from '../../routes/move';
import { whichDialog, merchantOnLocation, mapCoordToLocation, merchantCount } from '../../utils';
import { canTalkToSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from '../../utils/smuggler';

class TeaHouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gambledNumber: null,
      smuggler: {
        goodWanted: null,
        trade: null
      }
    };

    this.handleChooseNumber = this.handleChooseNumber.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleTeaHouseEndTurn = this.handleTeaHouseEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = this.handleAssistant.bind(this);
    this.handleMerchant = this.handleMerchant.bind(this);

    /** smuggler functions */
    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.talkToSmuggler = talkToSmuggler.bind(this);
    this.handleSmugglerGoodClick = handleSmugglerGoodClick.bind(this);
    this.handleSmugglerPayClick = handleSmugglerPayClick.bind(this);
  }

  // Assistant dialogs
  handleAssistant() {
    this.props.closeModal();
    if (merchantOnLocation(this.props.playerId, this.props.currentPosition, this.props.merchants)) {
      let numMerchants = merchantCount(this.props.playerId, this.props.currentPosition, this.props.merchants);
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { merchantCount: numMerchants, currentPosition: this.props.currentPosition, dialog: 'merchant_encounter'});
    } else {
      this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
    }
  }

  // Merchant dialogs
  handleMerchant() {
    this.props.closeModal();
    this.props.openModal(mapCoordToLocation(this.props.currentPosition), { currentPosition: this.props.currentPosition, dialog: 'action' });
  }

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  handleChooseNumber (evt, good){
    const number = +evt.target.textContent;
    this.setState({ gambledNumber: number });
  }

  handleDiceRoll (rollSum){
    const gamble = this.state.gambledNumber;
    setTimeout(() => {
      this.handleTeaHouseEndTurn(gamble, rollSum)
    }, 2000)
  }

  handleTeaHouseEndTurn (gamble, rollSum){
    actionTeaHouse(this.props.gameId, this.props.playerId, gamble, rollSum)
      .then(this.handleSmuggler)
      .catch(console.error);
  }

  handleEndTurn (){
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  render() {
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/tea_house.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const gambledNumber = this.state.gambledNumber;
    const ddMenuStyle = {
      backgroundColor: 'white',
      marginLeft: 100,
      width: 100,
      fontSize: 18
    }

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>If the dice roll meets or exceeds your gamble,<br />you get the sum you name.<br />Otherwise, you walk away with only two lira.</p>
        </div>
          <div className='row'>
            <DropDownMenu value={this.state.gambledNumber} style={ddMenuStyle} onChange={this.handleChooseNumber}>
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={3} primaryText="3" />
              <MenuItem value={4} primaryText="4" />
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={6} primaryText="6" />
              <MenuItem value={7} primaryText="7" />
              <MenuItem value={8} primaryText="8" />
              <MenuItem value={9} primaryText="9" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={11} primaryText="11" />
              <MenuItem value={12} primaryText="12" />
            </DropDownMenu>
            {
              gambledNumber &&
              <Dice done={this.handleDiceRoll} />
            }
          </div>
          <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(TeaHouse);
