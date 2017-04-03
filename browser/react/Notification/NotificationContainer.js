'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fbDB } from '../../firebase';

import { toast } from 'react-toastify';

/** -------- Selectors ---------- */
import { getGameId, getPlayerMap } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';
import { getBoard } from '../../redux/reducers/board-reducer';

/** LOG TYPES */
import { formatLogMessage } from '../../utils/log'

class NotificationContainer extends Component {

  constructor(props){
    super(props)

  }

  getCurrUnixTime() {
    return Math.floor((new Date().getTime()));
  }

  componentDidMount() {

    const { gameId, userId, playerMap, board } = this.props;

    this.gameLogRef = fbDB.ref(`gameLog/${gameId}`);
    this.gameLogEventHandler = snapshot => {

      // If the log is older than 2 seconds ignore.
      if (snapshot.val().timestamp + 2000 < this.getCurrUnixTime() ) {
        return;
      }

      const logMessage = formatLogMessage(snapshot.val(), playerMap, board, userId);

      if ( logMessage && logMessage.trim() !== '') {
        toast(logMessage, { type: toast.TYPE.INFO });
      }

    };
    this.gameLogRef.on('child_added', this.gameLogEventHandler);

  }

  componentWillUnMount() {
    this.gameLogRef.off('child_added', this.gameLogEventHandler);
  }

  render() {

    return null;
  }
}

const mapStateToProps = (state) => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  playerMap: getPlayerMap(state),
  board: getBoard(state),
});

export default connect(mapStateToProps)(NotificationContainer);
