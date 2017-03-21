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
    // this.props.firebase.login({
    //   provider: 'google',
    //   type: 'redirect'
    // })
    fbAuth.signInWithRedirect(googleProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

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
        <button onClick={this.googleLogin}>login</button>
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
