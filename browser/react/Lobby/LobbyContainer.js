import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS
} from 'react-redux-firebase';
import { fbAuth } from '../../firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { settingUser } from '../../redux/action-creators/user';
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';
import { fetchNewGame } from '../../redux/action-creators/game';

import { createRoom, addToRoom, removeFromRoom, deleteRoom } from '../../routes/lobby.js';

import { Room } from './Room.js';

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { joined: null };

    this.removeUserFromRoom = this.removeUserFromRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
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

  handleCreateRoom(event){
    event.preventDefault();
    const name = event.target[0].value;
    const userId = this.props.userId;
    createRoom(name, userId);
  }

  handleDeleteRoom(event, roomId){
    event.preventDefault();
    deleteRoom(roomId).catch(console.error);
  }

  addCurrentUserToRoom(event, roomId, userId) {
    if (event) event.preventDefault();
    const name = event.target[0].value || 'Anonymous';
    addToRoom(roomId, userId, name)
    .then(() => this.setState({ joined: roomId }))
    .catch(console.error);
  }

  removeUserFromRoom(evt, roomId, idToRemove) {
    evt.preventDefault();
    const leaveRoom = this.props.leaveRoom;
    const ownId = this.props.userId;
    removeFromRoom(roomId, idToRemove)
    .then(() => {
      if (idToRemove === ownId) {
        this.setState({joined: null})
      }
    });
  }

  handleStartGame(event, roomId, usersMap){
    event.preventDefault();
    this.props.startGame(roomId, usersMap); // dispatches to store
  }

  render() {
    const roomData = this.props.roomData;
    const paperStyle = {
      height: 130,
      width: 800,
      padding: 20,
      margin: 20,
      backgroundColor: '#8C5942',
      textAlign: 'center',
      display: 'inline-block'
    };

    return (
      <MuiThemeProvider>
        <div id="lobby-container">

          <img src={`images/Constantinople-Title-2.png`} id="game-title" />

          <div id="create-room-button">
            <Paper style={paperStyle} zDepth={3}>
              <form onSubmit={ this.handleCreateRoom }>
                <TextField hintText="Create new room" style={{marginLeft: 20}} />
                <br />
                <RaisedButton type="submit">
                  CREATE
                </RaisedButton>
              </form>
            </Paper>
          </div>

          <div className="row">
          {
            roomData &&
            Object.keys(roomData).map(roomId => {
              return (
                <Room
                  key={roomId}
                  roomId={roomId}
                  roomData={roomData[roomId]}
                  userId={this.props.userId}
                  joined={this.state.joined}
                  handleLeaveRoom={this.removeUserFromRoom}
                  handleJoinRoom={this.addCurrentUserToRoom}
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
  roomData: dataToJS(state.firebase, 'rooms'),
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
