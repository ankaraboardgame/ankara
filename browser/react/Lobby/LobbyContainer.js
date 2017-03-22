import React from 'react'
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
import { fetchNewGame } from '../../redux/action-creators/game';

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

  componentDidMount() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('setting user:', user);
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
    this.roomsRef.push({ full: false })
      .catch(console.error);
  }

  addCurrentUserToRoom(roomId, userId) {
    this.roomsRef.child(roomId).on('value', function(snapshot){
      if (snapshot.numChildren() === 4){
        this.props.startGame(roomId, newUserList);
      }
    })
    .then(() => {
      this.roomsRef.child(roomId).push(userId)
    })
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
                roomId={roomId}
                handleRemove={this.removeUser}
                handleJoin={this.addCurrentUserToRoom}
                user={this.props.user}
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
  startGame: (roomId, usersObj) => dispatch(fetchNewGame(roomId, usersObj))
})

const gameSession = firebaseConnect(['session', 'rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
