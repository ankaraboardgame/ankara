import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionBuyMosqueTile } from '../../routes/location';
import { tileAdd1Assistant } from '../../routes/bonus';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class GreatMosque extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyGreatMosqueTile = this.handleBuyGreatMosqueTile.bind(this);
  }

  handleBuyGreatMosqueTile(selectedTile, goodRequired){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionBuyMosqueTile(gameId, playerId, 'greatMosque', selectedTile, goodRequired)
      .then(() => {
        if(selectedTile === 'heirloom'){
          tileAdd1Assistant(gameId, playerId)
        }
      })
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error)
  }

  render() {
    const { greatMosqueData } = this.props;
    const tile1 = greatMosqueData.heirloom;
    const tile2 = greatMosqueData.fruit;
    return (
      <div>
        <img src={`images/mosque/great/greatMosque_${tile1}_${tile2}.jpg`} id="img-location" />
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
                  <RaisedButton label="Buy Heirloom Mosque Tile" style={style} primary={true} onTouchTap={() => this.handleBuyGreatMosqueTile('heirloom', heirloomRequired)}  />
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
                  <RaisedButton label="Buy Fruit Mosque Tile" style={style} primary={true} onTouchTap={() => this.handleBuyGreatMosqueTile('fruit', fruitRequired)} />
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
        <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={handleEndTurn} />
        <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
      </div>
    );
  }
}

export default GreatMosque;
