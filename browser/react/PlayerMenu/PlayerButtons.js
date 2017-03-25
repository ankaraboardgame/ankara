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
      color: null,
      selectedPlayer: null,
      display: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleButtonClick(color){
    const colorMap = { red: 0, blue: 1, green: 2, yellow: 3 }
    const merchants = this.props.gamesRef.merchants;
    const selectedPlayer = this.state.currentPlayer;
    let playerId = null;

    for(let merchant in merchants){
      if(merchants[merchant].number === colorMap[color]) playerId = merchant
    }

    if(selectedPlayer === playerId){
      this.setState({
        color: null,
        selectedPlayer: null,
        display: false
      })
    }

    if(selectedPlayer !== playerId){
      this.setState({
        color: color,
        selectedPlayer: playerId,
        display: true
      })
    }
  }

  handleClose(){
    this.setState({
      color: null,
      selectedPlayer: null,
      display: false
    })
  }

  render(){
    const color = this.state.color
    const selectedPlayer = this.state.selectedPlayer;
    const gamesRef = this.props.gamesRef;
    const display = this.state.display;
    return (
      <div id="player-info-row">
        <div id="player-buttons-column">
          { gamesRef.playerIds[0] && <img src={'images/player/redplayer.png'} className="player-icons" onTouchTap={() => this.handleButtonClick('red') } /> }
          { gamesRef.playerIds[1] && <img src={'images/player/blueplayer.png'} className="player-icons" onTouchTap={() => this.handleButtonClick('blue')} /> }
          { gamesRef.playerIds[2] && <img src={'images/player/greenplayer.png'} className="player-icons" onTouchTap={() => this.handleButtonClick('green')} /> }
          { gamesRef.playerIds[3] && <img src={'images/player/yellowplayer.png'} className="player-icons" onTouchTap={() => this.handleButtonClick('yellow')} /> }
        </div>
        {
          display && selectedPlayer &&
          <div id="player-detailed-info" onTouchTap={this.handleClose} >
            <p>{gamesRef.playerMap[selectedPlayer]}</p>
            <table>
              <tbody>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fabric.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.fabric} / ${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fruits.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.fruit} / ${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/heirlooms.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.heirloom} / ${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/spices.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.spice} / ${gamesRef.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/lira.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.money}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/ruby.png" /></td>
                  <td>{`${gamesRef.merchants[selectedPlayer].wheelbarrow.ruby}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

export default PlayerButtons
