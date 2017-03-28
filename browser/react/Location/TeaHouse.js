import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Dice from '../Pieces/Dice';

import { actionTeaHouse } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class TeaHouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gambledNumber: null,
      rolled: false
    };

    this.handleChooseNumber = this.handleChooseNumber.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
    this.handleTeaHouseEndTurn = this.handleTeaHouseEndTurn.bind(this);

  }

  handleChooseNumber (evt, good){
    const number = +evt.target.textContent;
    this.setState({ gambledNumber: number });
  }

  handleDiceRoll (rollSum){
    this.setState({ rolled: true })
    const gamble = this.state.gambledNumber;
    setTimeout(() => {
      this.handleTeaHouseEndTurn(gamble, rollSum)
    }, 2000)
  }

  handleTeaHouseEndTurn (gamble, rollSum){
    const { gameId, playerId, handleActionEnd, openModal, closeModal } = this.props;
    actionTeaHouse(gameId, playerId, gamble, rollSum)
      .then(() => handleActionEnd())
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <img src={`images/locations/tea_house.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { handleActionEnd, handleMoreOptionsClick } = this.props;
    const gambledNumber = this.state.gambledNumber;
    const ddMenuStyle = {
      backgroundColor: 'white',
      marginLeft: 100,
      width: 100,
      fontSize: 18
    }
    const style = { margin: 12 }

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
        <RaisedButton label="End my turn" style={style} primary={true} onTouchTap={handleActionEnd} disabled={this.state.rolled}  />
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
      </div>
    );
  }
}

export default TeaHouse;
