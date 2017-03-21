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


class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.googleLogin = this.googleLogin.bind(this);
  }

  googleLogin() {

    // Call with info
    this.props.firebase.login({
      provider: 'google',
      type: 'redirect'
    })

  }

  componentDidMount() {

    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        this.props.setUser(user);
      }
    });
  }

  render() {
    // const { gameSession } = this.props;
    // const playersList = !isLoaded(gameSession.connectedPlayers)
    //   ? 'Loading'
    //   : isEmpty(gameSession.connectedPlayers)
    //     ? 'No one is in the game'
    //     : Object.keys(gameSession.connectedPlayers).map(
    //         (key, id) => (
    //           <TodoItem key={key} id={id} todo={todos[key]}/>
    //         )
    //       )

    return (
      <div>
        <p>My user id: {this.props.user && this.props.user.uid}</p>
        <button onClick={this.googleLogin}>login</button>
        <Link to="/game">Play!</Link>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user.user,
  gameSession: dataToJS(state.firebase, 'session'),
  firebase: state.firebase
})

const mapDispatchToProps = (dispatch) =>({
  setUser: user => dispatch(settingUser(user))
})

const gameSession = firebaseConnect(['session'])(Lobby)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
