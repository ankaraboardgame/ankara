import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyMosqueTile } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class SmallMosque extends React.Component {
  constructor(props) {
    super(props);

    this.handleBuySmallMosqueTile = this.handleBuySmallMosqueTile.bind(this);
  }

  handleBuySmallMosqueTile(selectedTile, goodRequired){
    if (!this.buttonClicked) {
      this.buttonClicked = true;
      const { gameId, playerId, handleActionEnd } = this.props;
      actionBuyMosqueTile(gameId, playerId, 'smallMosque', selectedTile, goodRequired)
        .then(() => handleActionEnd())
        .then(() => { this.buttonClicked = false })
        .catch(console.error)
    }
  }

  render() {
    const { smallMosqueData } = this.props;

    return (
      <div>
        <img src={`images/mosque/small/smallMosque_${smallMosqueData.fabric}_${smallMosqueData.spice}.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { smallMosqueData, userWheelbarrow, abilities, playerId, handleActionEnd, handleMoreOptionsClick } = this.props;
    const fabricRequired = smallMosqueData.fabric;
    const spiceRequired = smallMosqueData.spice;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <text>You can buy 1 tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />Earn a ruby when you have acquired both tiles.</text>
        </div>
          <div id="mosque-row">
            <div id="mosque-fabric">
              {
                userWheelbarrow.fabric >= fabricRequired && !abilities.fabric.acquired ?
                <div>
                  <RaisedButton label="Buy Fabric Mosque Tile" style={style} primary={true} onTouchTap={() => this.handleBuySmallMosqueTile('fabric', fabricRequired)}  />
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
                  <RaisedButton id="spice" label="Buy Spice Mosque Tile" style={style} primary={true} onTouchTap={() => this.handleBuySmallMosqueTile('spice', spiceRequired)}  />
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
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
        <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleActionEnd} />
      </div>
    );
  }
};

export default SmallMosque;
