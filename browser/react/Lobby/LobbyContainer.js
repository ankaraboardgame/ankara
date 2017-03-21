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

  render() {
    console.log(this.props.firebase.auth())

    return (
      <div>
        <div id="join-container">

        </div>
        <p>My user id: {this.props.user && this.props.user.uid}</p>
        <Link to="/game">Play!</Link>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user.user,
  gameSession: dataToJS(state.firebase, 'session'),
  firebase: state.firebase,
  auth: pathToJS(firebase, 'auth')
})

const mapDispatchToProps = (dispatch) =>({
  setUser: user => dispatch(settingUser(user))
})

const gameSession = firebaseConnect(['session'])(Lobby)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
