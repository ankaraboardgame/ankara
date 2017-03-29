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
import Divider from 'material-ui/Divider';

import { settingUser } from '../../redux/action-creators/user';
import { joinRoom, leaveRoom } from '../../redux/action-creators/room';
import { fetchNewGame } from '../../redux/action-creators/game';

import { createRoom, addToRoom, removeFromRoom, deleteRoom } from '../../routes/lobby.js';

import { Room } from './Room.js';
import ChatContainer from '../Chat/ChatContainer.js';

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      joined: null
    };

    this.removeUserFromRoom = this.removeUserFromRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
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

  handleSearchBar(event){
    this.setState({searchQuery: event.target.value.toLowerCase()})
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
      height: 100,
      width: 500,
      padding: 20,
      margin: 20,
      backgroundColor: '#8C5942',
      textAlign: 'center',
      display: 'inline-block'
    };
    const searchStyle = {
      color: 'white',
      fontTransform: 'uppercase',
      fontStyle: 'italic',
      fontSize: 24,
      width: 500
    };
    const hintStyle = {
      color: '#555',
      fontTransform: 'uppercase',
      fontStyle: 'italic',
      fontSize: 24
    };


    return (
      <MuiThemeProvider>
        <div id="lobby-container">

          <img src={`images/Ankara-Title.png`} id="game-title" />

          <div id="create-room-button">
            <Paper style={paperStyle} zDepth={3}>

              <form onSubmit={ this.handleCreateRoom }>
                <TextField hintText="Create new room" style={{marginLeft: 20}} />
                <RaisedButton type="submit">
                  CREATE
                </RaisedButton>
              </form>

            </Paper>
          </div>

          <Divider />

          <TextField
            onChange={this.handleSearchBar}
            hintText="Search rooms"
            hintStyle={hintStyle}
            inputStyle={searchStyle}
          />

          <div className="room-column">
          {
            roomData &&
            Object.keys(roomData).reverse().map(roomId => {
              return (
                roomData[roomId].name.toLowerCase().includes(this.state.searchQuery)) ?
                (
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
                ) : null
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
  startGame: (roomId, usersObj) => dispatch(fetchNewGame(roomId, usersObj))
})

const fbWrappedLobbyContainer = firebaseConnect(['rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(fbWrappedLobbyContainer)
