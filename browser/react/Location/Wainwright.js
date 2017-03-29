import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyWbExt, earnRuby } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION, MORE_OPTIONS } from '../Modal/turn_types';

/** -------- Component -------- */
class Wainwright extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extBought: false
    }
    this.handleBuyExtension = this.handleBuyExtension.bind(this);
    this.handleBuyExtensionEarnRuby = this.handleBuyExtensionEarnRuby.bind(this);

  }

  handleBuyExtension(){
    const { gameId, playerId, handleActionEnd, openModal, closeModal } = this.props;
    this.setState({ extBought: true })
    actionBuyWbExt(gameId, playerId)
      .catch(console.error)
  }

  handleBuyExtensionEarnRuby(){
    const { gameId, playerId, handleActionEnd, openModal, closeModal } = this.props;
    this.setState({ extBought: true })
    actionBuyWbExt(gameId, playerId)
      .then(() => {
        earnRuby(gameId, playerId)
      })
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
    const { playerId, userWheelbarrow, handleActionEnd, handleMoreOptionsClick } = this.props;
    const extBought = this.state.extBought;
    return (
      <div id="turn-dialog-half">
        {
            userWheelbarrow.money < 7 && !extBought ?
            <div>
              <div id="text-box">
                <p>Sorry, you do not have enough money at this time. End your turn.</p>
              </div>
              <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleActionEnd}  />
              <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(MORE_OPTIONS)} />
            </div>
            : userWheelbarrow.size === 4 ?
            <div>
              <div id="text-box">
                <p>You have a wheelbarrow size of 4. You can buy one more extension, and earn a ruby!</p>
              </div>
              <div id="market-row">
                <RaisedButton label="Buy an extension" style={style} primary={true} disabled={extBought} onTouchTap={this.handleBuyExtensionEarnRuby}  />
                <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleActionEnd} />
              </div>
              <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(MORE_OPTIONS)} />
            </div>
            : userWheelbarrow.size === 5 ?
            <div>
              <div id="text-box">
                {
                  !extBought &&
                  <p>You already have the largest size of wheelbarrow.</p>
                }
              </div>
              <div id="market-row">
                <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleActionEnd}  />
                <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(MORE_OPTIONS)} />
              </div>
            </div>
            :
            <div>
              <div id="text-box">
                <p>Buy a wheelbarrow extension for 7 Lira.<br /> Get a ruby when your wheelbarrow size is 5.</p>
              </div>
              <div id="market-row">
                <RaisedButton label="Buy an extension" style={style} primary={true} disabled={extBought} onTouchTap={this.handleBuyExtension}  />
                <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleActionEnd} />
              </div>
              <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(MORE_OPTIONS)} />
            </div>
          }
      </div>
    );
  }
}

export default Wainwright;
