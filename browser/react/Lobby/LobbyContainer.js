import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS
} from 'react-redux-firebase'
import { fbDB, fbAuth, googleProvider } from '../../firebase';

import { settingUser } from '../../redux/action-creators/user';
import { connectToSession } from '../../routes/lobby';
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';
import { fetchNewGame } from '../../redux/action-creators/game';

import { CreateRoomButton } from './CreateRoomButton.js';
import { Room } from './Room.js'

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {canStartGame: false};
    // this.joinSession = this.joinSession.bind(this);
    // this.startGame = this.startGame.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentWillMount() {
    this.roomsRef = fbDB.ref('session/rooms');
    this.sessionRef = fbDB.ref('session');
  }

  componentDidMount() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        this.props.setUser(user);
      } else {
        fbAuth.signInAnonymously().catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error('login failed', errorCode, errorMessage);
        });
      }
    });
  }

  // joinSession() {
  //   connectToSession(this.props.user.uid);
  // }
  // startGame() {
  //   console.log('starting game');
  //   startGame(this.props.user.uid);
  // }

  handleCreateRoom(event){
    event.preventDefault();
    this.roomsRef.push({full: false})
      .catch(console.error);
  }

  addCurrentUserToRoom(roomId, users) {
    let full = false;
    const userListLength = Object.keys(users).length;
    if (userListLength === 4){
      full = true;
    }
    const newUserList = Object.assign(users, {[userListLength]: this.props.user.uid})
    this.roomsRef.child(roomId).set(newUserList)
      .then(() => {
        this.props.joinRoom();
        if (full) this.props.startGame(roomId, newUserList);
      });
  }

  removeUser(roomId, userId) {
    this.roomsRef.child(roomId + '/' + userId).remove()
    .then((result) => {
        this.props.leaveRoom();
    });
  }

  render() {
    return (
      <div>

        <CreateRoomButton handleClick={this.handleCreateRoom} />
        {
          this.props.gameSession && this.props.gameSession.rooms &&
          Object.keys(this.props.gameSession.rooms).map(roomId => {
            return (
              <Room
                key={roomId}
                id={roomId}
                handleRemove={this.removeUser}
                handleJoin={this.addCurrentUserToRoom}
                users={this.props.gameSession.rooms[roomId]}
                joined={this.props.joined}
              />
            )
          })
        }

      </div>
    )
  }

  componentDidUpdate() {
    // If there are 4 players in the session, trigger game start
    if(this.props.gameSession && Object.keys(this.props.gameSession.connectedPlayers).length === 4 && !this.state.canStartGame) {
      console.log('userid', this.props.user.uid);
      // Trigger game start
      this.setState({canStartGame: true});


    }
  }

}

const mapStateToProps = (state) => ({
  user: state.user.user,
  gameSession: dataToJS(state.firebase, 'session'),
  firebase: state.firebase,
  auth: pathToJS(firebase, 'auth'),
  joined: state.room.joined
})

const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(settingUser(user)),
  joinRoom: () => dispatch(joinRoom()),
  leaveRoom: () => dispatch(leaveRoom()),
  startGame: (roomId, usersObj) => dispatch(fetchNewGame(roomId, usersObj))
})

const gameSession = firebaseConnect(['session', 'rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
