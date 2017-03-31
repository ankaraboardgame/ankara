'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fbDB } from '../../firebase';

/** -------- Selectors ---------- */
import { getGameId, getPlayerMap, getGameLogData } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';
import { getBoard } from '../../redux/reducers/board-reducer';

/** LOG TYPES */
import { LOGTYPE, LOCATION_NAME } from '../../utils/log'

class GameHistoryComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      logs: []
    }
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({behavior: "smooth"});
  }

  formatLog(gameLog) {

    const { gameId, userId, playerMap, board } = this.props;
    const gameLogArray = Object.keys(gameLog)
    .map(key => {
      return gameLog[key];
    }).sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    const logMessages = gameLogArray.map(el => {

      const playerId = el.user;
      const type = el.type;
      const location = el.location;

      // Get coordinates from string
      const coords = location && location.split(',').map(str => Number(str));
      // Get Location name from coordinates
      const locationName = LOCATION_NAME[coords && board.level[coords[0]][coords[1]]];
      let message = undefined;
      switch(type) {
        case LOGTYPE.TURN:
          if (playerId === userId) {
            message = 'Your turn';
          } else {
            message = `${playerMap[playerId]}'s turn`
          }
          break;
        case LOGTYPE.GAME_JOIN:
          if (playerId === userId) {
            message = 'You joined the game';
          } else {
            message = `${playerMap[playerId]} joined the game`
          }
          break;
        case LOGTYPE.PLAYER_MOVE:
          if (playerId === userId) {
            message = `You moved to ${locationName}`;
          } else {
            message = `${playerMap[playerId]} moved to ${locationName}`;
          }
          break;
        case LOGTYPE.SMUGGLER_MOVE:
          message = `Smuggler moved to ${locationName}`;
          break;
        default:
          message = '';
          break;
      }

      return message;

    })

    return logMessages;


  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { gameLog } = this.props;

    const logMessages = this.formatLog(gameLog);

    return (
      <div style={{margin: 0, padding: 0}}>
        <ul className="gamelog-list">
        {
          logMessages && logMessages.map((log, index) => {
            return (<li key={index}>{log}</li>);
          })
        }
        </ul>
        <div style={ {float: 'left', clear: 'both'} } ref={(el) => { this.messagesEnd = el; }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  playerMap: getPlayerMap(state),
  board: getBoard(state),
  gameLog: getGameLogData(state)
});

export default connect(mapStateToProps)(GameHistoryComponent);
