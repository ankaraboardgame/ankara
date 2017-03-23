import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Modal from '../Modal/Modal';
import Dice from '../Pieces/Dice';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionTeaHouse } from '../../routes/location';
import { endTurn } from '../../routes/move';

class TeaHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gambledNumber: null }
    this.handleChooseNumber = this.handleChooseNumber.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleTeaHouseEndTurn = this.handleTeaHouseEndTurn.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
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
    const gambledNumber = this.state.gambledNumber;
    console.log('gambling', gambledNumber);

    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/tea_house.png`} id="img-location" />
          <p>If the dice roll meets or exceeds your gamble, you get the sum you name. Otherwise, you walk away with only two lira.</p>
          <DropDownMenu onChange={this.handleChooseNumber}>
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
          <RaisedButton label="No thanks, I'll end my turn" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndTurn}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(TeaHouse);
