import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyWbExt, earnRuby } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class Wainwright extends React.Component {
  constructor(props) {
    super(props);

    this.handleBuyExtension = this.handleBuyExtension.bind(this);
    this.handleBuyExtensionEarnRuby = this.handleBuyExtensionEarnRuby.bind(this);
  }

  handleBuyExtension(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyWbExt(gameId, playerId)
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  handleBuyExtensionEarnRuby(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyWbExt(gameId, playerId)
      .then(() => {
        earnRuby(gameId, playerId)
      })
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <img src={`images/locations/wainwright.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const { playerId, userWheelbarrow, handleEndTurn } = this.props;

    return (
      <div id="turn-dialog-half">
        {
            userWheelbarrow.money < 7 ?
            <div>
              <div id="text-box">
                <p>Sorry, you do not have enough money at this time. End your turn.</p>
              </div>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleEndTurn}  />
            </div>
            : userWheelbarrow.size === 4 ?
            <div>
              <div id="text-box">
                <p>You have a wheelbarrow size of 4. You can buy one more extension, and earn a ruby!</p>
              </div>
              <RaisedButton label="Buy an extension, and end turn" style={style} primary={true} onTouchTap={this.handleBuyExtensionEarnRuby}  />
            </div>
            : userWheelbarrow.size === 5 ?
            <div>
              <div id="text-box">
                <p>You already have the largest size of wheelbarrow.</p>
              </div>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleEndTurn}  />
            </div>
            :
            <div>
              <div id="text-box">
                <p>You can buy a wheelbarrow extension here.<br /><br />Each extension cost 7 Lira. <br />You can buy a maximum of 3 extensions, <br />at which point you will receive 1 ruby. <br /></p>
              </div>
              <RaisedButton label="Buy an extension, and end turn" style={style} primary={true} onTouchTap={this.handleBuyExtension}  />
            </div>
          }
      </div>
    );
  }
}

export default Wainwright;
