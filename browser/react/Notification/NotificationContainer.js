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
import { LOGTYPE, LOCATION_NAME } from '../../utils/log'

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
      const playerId = snapshot.val().user;
      const type = snapshot.val().type;
      const location = snapshot.val().location;
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

      if ( message && message.trim() !== '') {
        toast(message, { type: toast.TYPE.INFO });
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
