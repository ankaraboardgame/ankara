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
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';

import { CreateRoomButton } from './CreateRoomButton.js';
import { Room } from './Room.js'

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
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

  handleCreateRoom(event){
    event.preventDefault();
    this.roomsRef.push({empty: true})
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
        if (full) this.props.startGame(newUserList);
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
  startGame: () => dispatch(fetchNewGame())
})

const gameSession = firebaseConnect(['session', 'rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
