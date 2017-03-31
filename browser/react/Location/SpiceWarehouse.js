import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionMaxGood } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class SpiceWarehouse extends React.Component {
  constructor(props) {
    super(props);

    this.handleMaxGoodEndTurn = this.handleMaxGoodEndTurn.bind(this);
  }

  handleMaxGoodEndTurn(){

    if (!this.buttonClicked) {
      const { gameId, playerId, handleActionEnd } = this.props;
      this.buttonClicked = true;
      actionMaxGood(gameId, playerId, 'spice')
        .then(() => handleActionEnd())
        .then(() => { this.buttonClicked = false })
        .catch(console.error);
    }
  }

  render() {
    return (
      <div>
        <img src={`images/locations/spice_warehouse.jpg`} id="img-location" />
        { this.props.dialog && this.props.dialog === ACTION ? this.renderAction() : null }
      </div>
    );
  }

  renderAction() {
    const { handleMoreOptionsClick } = this.props;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-half">
        <div id="text-box">
          <div className="turn-dialog-column">
            <text>Look at all the spices! <br />Come back later if you need more!</text>
          </div>
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
          <RaisedButton label="Max spice and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn} />
        </div>
      </div>
    );
  }
};

export default SpiceWarehouse;
