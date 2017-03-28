import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyMosqueTile } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class SmallMosque extends React.Component {
  constructor(props) {
    super(props);

    this.handleBuyFabricTile = this.handleBuyFabricTile.bind(this);
    this.handleBuySpiceTile = this.handleBuySpiceTile.bind(this);
  }

  handleBuyFabricTile(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyMosqueTile(gameId, playerId, 'smallMosque', 'fabric')
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  handleBuySpiceTile(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyMosqueTile(gameId, playerId, 'smallMosque', 'spice')
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <img src={`images/locations/small_mosque.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { smallMosqueData, userWheelbarrow, abilities, playerId, handleEndTurn, handleMoreOptionsClick } = this.props;
    const fabricRequired = smallMosqueData.fabric;
    const spiceRequired = smallMosqueData.spice;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You can buy 1 tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />Earn a ruby when you have acquired both tiles.</p>
        </div>
          <div id="mosque-row">
            <div id="mosque-fabric">
              {
                userWheelbarrow.fabric >= fabricRequired && !abilities.fabric.acquired ?
                <div>
                  <RaisedButton label="Buy Fabric Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyFabricTile}  />
                </div>
                : !abilities.fabric.acquired ?
                <div>
                  <RaisedButton label="Buy Fabric Mosque Tile" disabled={true} style={style} primary={true}  />
                </div>
                :
                <div>
                  <RaisedButton label="Tile Already Acquired" disabled={true} style={style} primary={true}  />
                </div>
              }
            </div>
            <div id="mosque-spice">
              {
                userWheelbarrow.spice >= spiceRequired && !abilities.spice.acquired ?
                <div>
                  <RaisedButton id="spice" label="Buy Spice Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuySpiceTile}  />
                </div>
                : !abilities.fruit.acquired ?
                <div>
                  <RaisedButton label="Buy Spice Mosque Tile" disabled={true} style={style} primary={true}  />
                </div>
                :
                <div>
                  <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true}  />
                </div>
              }
            </div>
          </div>
        <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn} />
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
      </div>
    );
  }
}

export default SmallMosque;
