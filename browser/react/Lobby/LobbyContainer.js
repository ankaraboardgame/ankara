import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase';
import { fbAuth } from '../../firebase';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { settingUser } from '../../redux/action-creators/user';
import { fetchNewGame } from '../../redux/action-creators/game';
import { getGameId } from '../../redux/reducers/game-reducer.js';
import { getUserId } from '../../redux/reducers/user-reducer.js';
import { getRoomData } from '../../redux/reducers/room-reducer.js';

import { createRoom, addToRoom, removeFromRoom, deleteRoom, signalReady } from '../../routes/lobby.js';

import { Room } from './Room.js';

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

  /**
   * If you have clicked ready, and all other users in the room are ready,
   * then dispatch a 'start game action' which forwards you to the game.
  */
  componentDidUpdate(){
    const roomData = this.props.roomData;
    const myRoomId = this.state.joined;
    const myUserId = this.props.userId;
    if (this.state.ready && roomData && myRoomId){
      if (Object.keys(roomData[myRoomId].ready || {}).length === Object.keys(roomData[myRoomId].users).length){
        this.setState({ ready: false });
        this.props.startGame(myRoomId, roomData[myRoomId].users, myUserId);
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
    signalReady(roomId, this.props.userId)
      .then(() => this.setState({ ready: true }));
  }

  render() {
    const createRoomStyle = {
      height: 'auto',
      width: 500,
      padding: 20,
      backgroundColor: '#3D2F1B',
      textAlign: 'center',
      display: 'inline-block',
      borderRadius: '20px'
    };
    const searchStyle = {
      width: '50%',
      padding: 20,
      backgroundColor: '#222',
      opacity: 0.2
    };
    const searchInputStyle = {
      color: 'white',
      textTransform: 'uppercase',
      fontStyle: 'italic',
      fontSize: 20
    };

    const { userId, roomData, gameId } = this.props;

    return (
      <MuiThemeProvider>
        <div id="lobby-container">
          <img src="images/splash_bg.jpg" id="lobby-image" />
          {
            this.props.gameId &&
            <div id="lobby-warning">
              <Link to="/game">
                <div>
                  <p id={'lobby-warning-link'}>You are currently in a game. Click to go to the game room.</p>
                </div>
              </Link>
            </div>
          }
          <Link to="/">
            <img src={`images/Ankara-Title.png`} style={{width: '100%'}}/>
          </Link>

          <div id="create-room-button">
            <Paper style={createRoomStyle} zDepth={3}>
              <form onSubmit={ this.handleCreateRoom }>
                <TextField
                  hintText="New room name..."
                  style={{marginLeft: 20}}
                  hintStyle={{color: '#888'}}
                  inputStyle={{color: 'white'}}
                  onChange={this.handleCreateRoomTextFieldChange}
                />
                <RaisedButton
                  type="submit"
                  style={{marginLeft:'20px'}}
                  disabled={!this.state.createRoomField.length}>
                  CREATE
                </RaisedButton>
              </form>
              <TextField

                style={{marginRight: '89px'}}
                hintText="Search rooms"
                hintStyle={{color: '#888'}}
                inputStyle={{color: 'white'}}
                onChange={this.handleSearchBar}
              />
            </Paper>
          </div>

          <div className="row">
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
  auth: pathToJS(firebase, 'auth'),
  gameId: getGameId(state)
})

const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(settingUser(user)),
  startGame: (roomId, usersObj, userId) => dispatch(fetchNewGame(roomId, usersObj, userId))
})

const fbWrappedLobbyContainer = firebaseConnect(['rooms'])(LobbyContainer)
export default connect(mapStateToProps, mapDispatchToProps)(fbWrappedLobbyContainer)
