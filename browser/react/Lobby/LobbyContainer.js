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
import { connectToSession, startGame } from '../../routes/lobby';


class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canStartGame: false};
    this.joinSession = this.joinSession.bind(this);
    this.startGame = this.startGame.bind(this);
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

  joinSession() {
    connectToSession(this.props.user.uid);
  }
  startGame() {
    console.log('starting game');
    startGame(this.props.user.uid);
  }

  render() {

    return (
      <div>
        <div id="join-container">

        </div>
        <p>My user id: {this.props.user && this.props.user.uid}</p>
        {/*<Link to="/game">Play!</Link>*/}
        <button onClick={this.joinSession}>Play</button>
        {this.state.canStartGame ? (<button onClick={this.startGame}>Start Game</button>) : null}
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
  auth: pathToJS(firebase, 'auth')
})

const mapDispatchToProps = (dispatch) =>({
  setUser: user => dispatch(settingUser(user)),
})

const gameSession = firebaseConnect(['session'])(Lobby)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
