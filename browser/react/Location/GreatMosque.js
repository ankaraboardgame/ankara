import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyMosqueTile } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class GreatMosque extends React.Component {
  constructor(props) {
    super(props);

    this.handleBuyHeirloomTile = this.handleBuyHeirloomTile.bind(this);
    this.handleBuyFruitTile = this.handleBuyFruitTile.bind(this);
  }

  handleBuyHeirloomTile(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyMosqueTile(gameId, playerId, 'greatMosque', 'heirloom')
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  handleBuyFruitTile(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyMosqueTile(gameId, playerId, 'greatMosque', 'fruit')
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <img src={`images/locations/great_mosque.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { greatMosqueData, userWheelbarrow, abilities, playerId, handleEndTurn, handleMoreOptionsClick } = this.props;
    const heirloomRequired = greatMosqueData.heirloom;
    const fruitRequired = greatMosqueData.fruit;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You can buy a tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />Earn a ruby when you have acquired both tiles.</p>
        </div>
          <div id="mosque-row">
            <div id="mosque-heirloom">
              {
                userWheelbarrow.heirloom >= heirloomRequired && !abilities.heirloom.acquired ?
                <div>
                  <RaisedButton label="Buy Heirloom Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyHeirloomTile}  />
                </div>
                : !abilities.heirloom.acquired ?
                <div>
                  <RaisedButton label="Buy Heirloom Mosque Tile" disabled={true} style={style} primary={true}  />
                </div>
                :
                <div>
                  <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true} />
                </div>
              }
            </div>
            <div id="mosque-fruit">
              {
                userWheelbarrow.fruit >= fruitRequired && !abilities.fruit.acquired ?
                <div>
                  <RaisedButton label="Buy Fruit Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyFruitTile} />
                </div>
                : !abilities.fruit.acquired ?
                <div>
                  <RaisedButton label="Buy Fruit Mosque Tile" disabled={true} style={style} primary={true} />
                </div>
                :
                <div>
                  <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true} />
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

export default GreatMosque;
