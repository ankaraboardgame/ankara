'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { fbDB } from '../../firebase';
import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

/** -------- Selectors ---------- */
import { getGameId, getPlayerMap } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';

import { levels } from '../../game';

/** LOG TYPES */
import { LOGTYPE, LOCATION_NAME } from '../../utils/notification'

class NotificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      open: false,
    };
    this.timer = undefined;

  }

  getCurrUnixTime() {
    return Math.floor((new Date().getTime()) / 1000);
  }

  componentDidMount() {

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
      const locationName = LOCATION_NAME[coords && levels.basic[coords[0]][coords[1]]];
      let message;
      switch(type) {
        case LOGTYPE.TURN:
          if (playerId === userId) {
            message = 'It\'s Your turn';
          } else {
            message = `It\'s ${playerMap[playerId]}'s turn`
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
            message = `You moved to ${locationName} - ${location}`;
          } else {
            message = `${playerMap[playerId]} moved to ${locationName} - ${location}`;
          }
          break;
        case LOGTYPE.SMUGGLER_MOVE:
          message = `Smugger moved to ${locationName} - ${location}`;
          break;
        default:
          message = '';
          break;
      }



      // this.setState({
      //   open: true,
      //   message: message
      // });
      if ( message && message.trim() !== '') {
        toast(message, { type: toast.TYPE.INFO });
      }

      // this.timer = setTimeout(() => {
      //   this.setState({
      //     open: false
      //   });
      //   clearTimeout(this.timer);
      // }, 1500);
    };
    this.gameLogRef.on('child_added', this.gameLogEventHandler);
  }

  componentWillUnMount() {
    this.gameLogRef.off('child_added', this.gameLogEventHandler);
  }

  render() {
    const style={
      top: '0',
      bottom: 'auto',
      left: (window.innerWidth - 288) / 2,
      transform: 'translate3d(0, 0, 0)'
    }

    return (
      <div>
        <Snackbar
          style={style}
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={1500}
        />
        <ToastContainer autoClose={1500} position="top-right"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  playerMap: getPlayerMap(state)
});

export default connect(mapStateToProps)(NotificationComponent);

