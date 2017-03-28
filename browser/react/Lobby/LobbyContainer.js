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
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { settingUser } from '../../redux/action-creators/user';
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';
import { fetchNewGame } from '../../redux/action-creators/game';

import { Room } from './Room.js'

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);

    // local state
    this.state = { joined: false };

    this.removeUserFromRoom = this.removeUserFromRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
  }

  // get a reference to firebase database > rooms
  componentWillMount() {
    this.roomsRef = fbDB.ref('rooms');
  }

  componentWillUnMount() {
    this.roomsRef.off();
  }

  // create room after 'create room' button is clicked
  handleCreateRoom(event){
    event.preventDefault();
    const name = event.target[0].value;
    this.roomsRef.push({name}).catch(console.error); // should dispatch action
  }

  handleDeleteRoom(event, roomId){
    event.preventDefault();
    console.log('deleting room');
    this.roomsRef.child(roomId).remove();
  }

  // add user to specific room after 'join room' button is clicked
  addCurrentUserToRoom(event, roomId, userId) {
    event.preventDefault();
    const name = event.target[0].value || 'Anonymous';

    this.roomsRef.child(roomId).child('users').child(userId).set(name)
    .catch(console.error);

    this.setState({ joined: roomId });
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

  removeUserFromRoom(evt, roomId, idToRemove) {
    evt.preventDefault();
    const leaveRoom = this.props.leaveRoom;
    const ownId = this.props.userId;
    console.log(ownId, idToRemove)
    this.roomsRef.child(roomId).child('users').child(idToRemove).remove()
    .then((result) => {
        leaveRoom();
        if (idToRemove === ownId) {
          this.setState({joined: false})
        }
    });
  }

  render() {
    const fbRoomData = this.props.fbRoomData;
    const paperStyle = {
      height: 100,
      width: 800,
      padding: 20,
      margin: 20,
      backgroundColor: 'navajowhite',
      textAlign: 'center',
      display: 'inline-block'
    };

    return (
      <MuiThemeProvider>
        <div id="lobby-container">

          <h1>Constantinople</h1>

          <div id="create-room-button">
            <Paper style={paperStyle} zDepth={2}>
              <form onSubmit={ this.handleCreateRoom }>
                <TextField hintText="Create new room" style={{marginLeft: 20}} />
                <RaisedButton type="submit">
                  CREATE
                </RaisedButton>
              </form>
            </Paper>
          </div>

          <div className="row">
          {
            fbRoomData &&
            Object.keys(fbRoomData).map(roomId => {
              return (
                <Room
                  key={roomId}
                  roomId={roomId}
                  roomName={fbRoomData[roomId].name}
                  handleLeaveRoom={this.removeUserFromRoom}
                  handleJoinRoom={this.addCurrentUserToRoom}
                  users={fbRoomData[roomId].users}
                  userId={this.props.userId}
                  joined={this.state.joined}
                  handleStart={this.handleStartGame}
                  handleDeleteRoom={this.handleDeleteRoom}
                />
              )
            })
          }
          </div>

        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = (state) => ({
  userId: state.user.user && state.user.user.uid,
  fbRoomData: dataToJS(state.firebase, 'rooms'),
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
