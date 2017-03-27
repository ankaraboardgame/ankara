import React from 'react';
import { connect } from 'react-redux';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from '../Footer/FooterComponents'

class PlayerButtons extends React.Component {
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
    const merchants = this.props.gameData.merchants;
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
    const { color, selecterPlayer, display } = this.state;
    const { gameData } = this.props;
    return (
      <div id="player-info-row">
        <div id="player-buttons-column">
          { gameData.playerIds[0] && <img src={'images/player/redplayer.png'} className={"player-icons " + (gameData.playerIds[0] === gameData.playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('red') } /> }
          { gameData.playerIds[1] && <img src={'images/player/blueplayer.png'} className={"player-icons " + (gameData.playerIds[1] === gameData.playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('blue')} /> }
          { gameData.playerIds[2] && <img src={'images/player/greenplayer.png'} className={"player-icons " + (gameData.playerIds[2] === gameData.playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('green')} /> }
          { gameData.playerIds[3] && <img src={'images/player/yellowplayer.png'} className={"player-icons " + (gameData.playerIds[3] === gameData.playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('yellow')} /> }
        </div>
        {
          display && selectedPlayer &&
          <div id="player-detailed-info" onTouchTap={this.handleClose} >
            <p>{gameData.playerMap[selectedPlayer]}</p>
            <table>
              <tbody>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fabric.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.fabric} / ${gameData.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fruits.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.fruit} / ${gameData.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/heirlooms.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.heirloom} / ${gameData.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/spices.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.spice} / ${gameData.merchants[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/lira.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.money}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/ruby.png" /></td>
                  <td>{`${gameData.merchants[selectedPlayer].wheelbarrow.ruby}`}</td>
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
