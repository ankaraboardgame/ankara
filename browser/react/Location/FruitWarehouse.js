import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { actionMaxGood } from '../../routes/location';

/** -------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

/** -------- Component -------- */
class FruitWarehouse extends React.Component {
  constructor(props) {
    super(props);

    this.handleMaxGoodEndTurn = this.handleMaxGoodEndTurn.bind(this);
  }

  handleMaxGoodEndTurn(){
    const { gameId, playerId, handleEndTurn, openModal, closeModal } = this.props;
    actionMaxGood(gameId, playerId, 'fruit')
      .then(() => closeModal())
      .then(() => handleEndTurn())
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <img src={`images/locations/fruit_warehouse.jpg`} id="img-location" />
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
            <p>Look at all the fruits! <br /><br />Come back later if you need more! <br /></p>
          </div>
          <RaisedButton label="Max fruit and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn}  />
          <RaisedButton label="More Options" style={style} onTouchTap={() => handleMoreOptionsClick(ACTION)} />
        </div>
      </div>
    );
  }
}

export default FruitWarehouse;
