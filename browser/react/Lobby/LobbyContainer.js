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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { settingUser } from '../../redux/action-creators/user';
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';
import { fetchNewGame } from '../../redux/action-creators/game';

import { CreateRoomButton } from './CreateRoomButton.js';
import { Room } from './Room.js'

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.removeUser = this.removeUser.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  // get a reference to firebase database > rooms
  componentWillMount() {
    this.roomsRef = fbDB.ref('rooms');
  }

  componentDidMount() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
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

  // create room after 'create room' button is clicked
  handleCreateRoom(event){
    event.preventDefault();
    const name = event.target[0].value;
    this.roomsRef.push({name}).catch(console.error);
  }

  // add user to specific room after 'join room' button is clicked
  addCurrentUserToRoom(event, roomId, userId) {
    event.preventDefault();
    const roomsRef = this.roomsRef;
    const name = event.target[0].value;

    roomsRef.child(roomId).child('users').child(userId).set(name)
    .catch(console.error);
  }

  // create room after 'create room' button is clicked
  handleStartGame(event, roomId){
    event.preventDefault();
    const roomsRef = this.roomsRef;
    const startGame = this.props.startGame;

    roomsRef.child(roomId).child('users').once('value', function(snapshot){
      startGame(roomId, snapshot.val());
    });
  }

  // remove self from room
  // removeUser(roomId, idToRemove) {
  //   this.roomsRef.child(roomId).child('users').child(idToRemove).remove()
  //   .then((result) => {
  //       this.props.leaveRoom();
  //   });
  // }

  render() {
    const fbRooms = this.props.fbRooms;

    return (
      <MuiThemeProvider>
        <div id="lobby-container">

          <div id="create-room-button">
            <form onSubmit={ this.handleCreateRoom }>
              <input
                type="text"
                name="roomname"
                placeholder="Enter new room name." />
              <input type="submit" value="Create Room" />
            </form>
          </div>

          {
            fbRooms &&
            Object.keys(fbRooms).map(roomId => {
              return (
                <Room
                  key={roomId}
                  roomId={roomId}
                  roomName={fbRooms[roomId].name}
                  handleRemove={this.removeUser}
                  handleJoin={this.addCurrentUserToRoom}
                  users={fbRooms[roomId].users}
                  userId={this.props.userId.uid}
                  joined={this.props.joined}
                  handleStart={this.handleStartGame}
                />
              )
            })
          }

        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = (state) => ({
  userId: state.user.user,
  fbRooms: dataToJS(state.firebase, 'rooms'),
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

const fbWrappedLobbyContainer = firebaseConnect(['rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(fbWrappedLobbyContainer)
