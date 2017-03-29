'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fbDB } from '../../firebase';

import { toast } from 'react-toastify';

// import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

/** -------- Selectors ---------- */
import { getGameId, getPlayerMap } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';

import { levels } from '../../game';

/** LOG TYPES */
import { LOGTYPE, LOCATION_NAME } from '../../utils/log'

class GameHistoryComponent extends Component {

  constructor(props){
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

  getCurrUnixTime() {
    return Math.floor((new Date().getTime()) / 1000);
  }

  componentDidMount() {
    this.scrollToBottom();

    const { gameId, userId, playerMap } = this.props;

    this.gameLogRef = fbDB.ref(`gameLog/${gameId}`);
    this.gameLogEventHandler = snapshot => {

      if (snapshot.val().timestamp + 2 < this.getCurrUnixTime() ) {
        return;
      }
      const playerId = snapshot.val().user;
      const type = snapshot.val().type;
      const location = snapshot.val().location;
      const coords = location && location.split(',').map(str => Number(str));
      const locationName = LOCATION_NAME[coords && levels.long[coords[0]][coords[1]]];
      let message;
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
          message = `Smugger moved to ${locationName}`;
          break;
        default:
          message = '';
          break;
      }

      if ( message && message.trim() !== '') {
        toast(message, { type: toast.TYPE.INFO });
        this.setState({logs: [...this.state.logs, message]});
      }

    };
    this.gameLogRef.on('child_added', this.gameLogEventHandler);

  }

  componentWillUnMount() {
    this.gameLogRef.off('child_added', this.gameLogEventHandler);
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  render() {
    const style = {
      "backgroundColor": "#d0cabe",
      "fontSize": "14px",
      "margin": "0"
    }
    // const { userId, playerMap, historyRef } = this.props;
    return (
      <div>
        <table style={style} >
          <tbody>
            { this.state.logs && this.state.logs.map((log, index) => {
              return (<tr key={index}><td>{log}</td></tr>);
            })}
          </tbody>
        </table>
        <div style={ {float:"left", clear: "both"} }
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  playerMap: getPlayerMap(state)
});

export default connect(mapStateToProps)(GameHistoryComponent);
