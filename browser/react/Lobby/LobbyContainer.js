import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase';
import { fbAuth } from '../../firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import { settingUser } from '../../redux/action-creators/user';
import { fetchNewGame } from '../../redux/action-creators/game';
import { getUserId } from '../../redux/reducers/user-reducer.js';
import { getRoomData } from '../../redux/reducers/room-reducer.js';

import { createRoom, addToRoom, removeFromRoom, deleteRoom, signalReady } from '../../routes/lobby.js';

import { Room } from './Room.js';
import ChatContainer from '../Chat/ChatContainer.js';

/************ LobbyContainer ****************/

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      createRoomField: '',
      joined: null,
      ready: false
    };

    this.handleCreateRoomTextFieldChange = this.handleCreateRoomTextFieldChange.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
    this.addCurrentUserToRoom = this.addCurrentUserToRoom.bind(this);
    this.removeUserFromRoom = this.removeUserFromRoom.bind(this);
    this.handleReadyToStart = this.handleReadyToStart.bind(this);
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

  componentDidUpdate(){
    const roomData = this.props.roomData;
    const myRoomId = this.state.joined;
    if (roomData && myRoomId){
      // if all users have clicked 'ready', dispatch a 'create game action'
      if (Object.keys(roomData[myRoomId].ready || {}).length === Object.keys(roomData[myRoomId].users).length){
        this.props.startGame(myRoomId, roomData[myRoomId].users);
        // will forward all users to the game
      }
    }
  }

  handleCreateRoomTextFieldChange(event){
    this.setState({ createRoomField: event.target.value })
  }

  handleSearchBar(event){
    this.setState({ searchQuery: event.target.value })
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
    const ownId = this.props.userId;
    removeFromRoom(roomId, idToRemove)
    .then(() => {
      if (idToRemove === ownId) {
        this.setState({ joined: null })
      }
    });
  }

  handleReadyToStart(event, roomId){
    event.preventDefault();
    console.log('click')
    signalReady(roomId, this.props.userId)
      .then(() => this.setState({ ready: true }));
  }

  render() {

    const createRoomStyle = {
      height: 90,
      width: 500,
      padding: 20,
      margin: 20,
      backgroundColor: '#222',
      textAlign: 'center',
      display: 'inline-block'
    };
    const searchStyle = {
      color: 'white',
      textTransform: 'uppercase',
      fontStyle: 'italic',
      fontSize: 28,
      width: 500
    };
    const hintStyle = {
      color: '#555',
      textTransform: 'uppercase',
      fontStyle: 'italic',
      fontSize: 28,
      height: 50
    };

    const { userId, roomData } = this.props;

    return (
      <MuiThemeProvider>
        <div id="lobby-container">

          <img src={`images/Ankara-Title.png`} id="game-title" />

          <div id="create-room-button">
            <Paper style={createRoomStyle} zDepth={3}>

              <form onSubmit={ this.handleCreateRoom }>
                <TextField
                  hintText="Create new room"
                  style={{marginLeft: 20}}
                  hintStyle={{color: '#ccc'}}
                  inputStyle={{color: 'white'}}
                  onChange={this.handleCreateRoomTextFieldChange}
                />
                <RaisedButton
                  type="submit"
                  disabled={!this.state.createRoomField.length}>
                  CREATE
                </RaisedButton>
              </form>

            </Paper>
          </div>

          <Divider />

          <TextField
            onChange={this.handleSearchBar}
            style={{ width: 500, height: 100 }}
            hintText="Search rooms"
            hintStyle={hintStyle}
            inputStyle={searchStyle}
          />

          <div className="room-column">
          {
            roomData &&
            Object.keys(roomData)
            .reverse()
            .map(roomId => {
              return (
                // apply search filter
                roomData[roomId].name.toLowerCase()
                .includes(this.state.searchQuery.toLowerCase())) ?
                (
                  <Room
                    key={roomId}
                    roomId={roomId}
                    roomData={roomData[roomId]}
                    userId={userId}
                    joined={this.state.joined}
                    handleJoinRoom={this.addCurrentUserToRoom}
                    handleLeaveRoom={this.removeUserFromRoom}
                    handleDeleteRoom={this.handleDeleteRoom}
                    handleReady={this.handleReadyToStart}
                    ready={this.state.ready}
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

/************ Higher Order Component *************/

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  roomData: getRoomData(state),
  auth: pathToJS(firebase, 'auth')
})

const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(settingUser(user)),
  startGame: (roomId, usersObj) => dispatch(fetchNewGame(roomId, usersObj))
})

const fbWrappedLobbyContainer = firebaseConnect(['rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(fbWrappedLobbyContainer)
