import React from 'react';
import { connect } from 'react-redux';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from '../Footer/FooterComponents'
import { getPlayerIds, getPlayerTurn, getGameMerchants, getPlayerMap } from '../../redux/reducers/game-reducer';

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
    const merchantsData = this.props.merchantsData;
    const selectedPlayer = this.state.currentPlayer;
    let playerId = null;

    for (let merchant in merchantsData) {
      if (merchantsData[merchant].number === colorMap[color]) playerId = merchant
    }
    
    if (selectedPlayer !== playerId && this.state.display === false ) {
      this.setState({
        color: color,
        selectedPlayer: playerId,
        display: true
      })
    } else {
      this.setState({
        display: false
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
    const { color, selectedPlayer, display } = this.state;
    const { playerIds, playerTurn, merchantsData, playerMap } = this.props;
    return (
      <div id="player-info-row">
        <div id="player-buttons-column">
          { playerIds[0] && <img src={'images/player/redplayer.png'} className={"player-icons " + (playerIds[0] === playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('red') } /> }
          { playerIds[1] && <img src={'images/player/blueplayer.png'} className={"player-icons " + (playerIds[1] === playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('blue')} /> }
          { playerIds[2] && <img src={'images/player/greenplayer.png'} className={"player-icons " + (playerIds[2] === playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('green')} /> }
          { playerIds[3] && <img src={'images/player/yellowplayer.png'} className={"player-icons " + (playerIds[3] === playerTurn ? 'player-icon-active' : null)} onTouchTap={() => this.handleButtonClick('yellow')} /> }
        </div>
        {
          display && selectedPlayer &&
          <div id="player-detailed-info" onTouchTap={this.handleClose} >
            <p>{playerMap[selectedPlayer]}</p>
            <table>
              <tbody>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fabric.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.fabric} / ${merchantsData[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/fruits.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.fruit} / ${merchantsData[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/heirlooms.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.heirloom} / ${merchantsData[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/cart/spices.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.spice} / ${merchantsData[selectedPlayer].wheelbarrow.size}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/lira.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.money}`}</td>
                </tr>
                <tr className="tr-player">
                  <td><img className="player-data-icons" src="./images/money/ruby.png" /></td>
                  <td>{`${merchantsData[selectedPlayer].wheelbarrow.ruby}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

/** --------- Container ----------- */
const mapStateToProps = state => ({
  playerIds: getPlayerIds(state),
  playerTurn: getPlayerTurn(state),
  merchantsData: getGameMerchants(state),
  playerMap: getPlayerMap(state)
});

export default connect(mapStateToProps)(PlayerButtons);
