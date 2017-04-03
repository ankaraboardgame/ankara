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
import { formatLogMessage, sortLogs } from '../../utils/log'

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

  formatLogs(gameLog) {

    const { userId, playerMap, board } = this.props;
    const gameLogArray = sortLogs(gameLog);
    return gameLogArray.map( el => formatLogMessage(el, playerMap, board, userId) );

  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { gameLog } = this.props;

    const logMessages = this.formatLogs(gameLog);

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
