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
    const { gambledNumber } = this.state;
    setTimeout(() => {
      this.handleTeaHouseEndTurn(gambledNumber, rollSum)
    }, 1200)
  }

  handleTeaHouseEndTurn (gamble, rollSum){
    const { gameId, playerId, handleActionEnd } = this.props;
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
    const { handleActionEnd, handleMoreOptionsClick, abilities } = this.props;
    const rerollAbility = abilities && abilities.fabric.acquired;
    const { gambledNumber, rolled } = this.state;
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
          <text>If the dice roll meets or exceeds your gamble,<br />you get the sum you name.<br />Otherwise, you walk away with only two lira.</text>
        </div>
        <div>
          <DropDownMenu value={gambledNumber} style={ddMenuStyle} onChange={this.handleChooseNumber}>
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
            <Dice done={this.handleDiceRoll} canReroll={rerollAbility} />
          }
        </div>
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
        <RaisedButton label="End my turn" style={style} primary={true} onTouchTap={handleActionEnd} disabled={rolled} />
      </div>
    );
  }
};

export default TeaHouse;
