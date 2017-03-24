import React, { Component } from 'react';
import { connect } from 'react-redux';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from '../Footer/FooterComponents'

class PlayerButtons extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: null
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(color){
    const colorMap = { red: 0, blue: 1, green: 2, yellow: 3 }
    const merchants = this.props.gamesRef.merchants;
    let playerId = null;

    for(let merchant in merchants){
      if(merchants[merchant].number === colorMap[color]) playerId = merchant
    }
    console.log('playerId', playerId);

    this.setState({
      color: color,
      selectedPlayer: playerId
    })
console.log('state playerId', this.state.selectedPlayer);

  }

  reset(){
    this.setState({
      color: null,
      selectedPlayer: null
    })
  }

  render(){
    const color = this.state.color
    const selectedPlayer = this.state.selectedPlayer;
    const gamesRef = this.props.gamesRef;
    return (
      <div id="player-info-row">
        <div id="player-buttons-column">
          <img src={'images/player/redplayer.png'} id="player-icons" onTouchTap={() => this.handleButtonClick('red') } />
          <img src={'images/player/blueplayer.png'} id="player-icons" onTouchTap={() => this.handleButtonClick('blue')} />
          <img src={'images/player/greenplayer.png'} id="player-icons" onTouchTap={() => this.handleButtonClick('green')} />
          <img src={'images/player/yellowplayer.png'} id="player-icons" onTouchTap={() => this.handleButtonClick('yellow')} />
        </div>
        <div id="player-detailed-info">
        {
          selectedPlayer &&
          <div>
          <p>{gamesRef.playerMap[selectedPlayer]}</p>
          <p>Wheelbarrow</p>
            <table>
              <tbody>
                <tr>
                  <td><img id="player-data-icons" src="./images/cart/fabric.png" />Fabric</td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.fabric}/${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr>
                  <td><img id="player-data-icons" src="./images/cart/fruits.png" />Fruit</td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.fruit}/${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr>
                  <td><img id="player-data-icons" src="./images/cart/heirlooms.png" />Heirloom</td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.heirloom}/${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr>
                  <td><img id="player-data-icons" src="./images/cart/spices.png" />Spice</td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.spice}/${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        </div>
      </div>
    )
  }
}

export default PlayerButtons
