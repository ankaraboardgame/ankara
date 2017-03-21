import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { fbAuth, googleProvider, facebookProvider } from '../firebase';

/** Importing components and containers */
import AppContainer from './AppContainer';
import Lobby from './Lobby/Lobby';
import LobbyContainer from './Lobby/LobbyContainer';

/** Importing action-creators */
import { loadBoard } from '../redux/action-creators/board';

/** onEnter handlers */
const onLobbyEnter = () => {
  console.log('on entering lobby');

  // fbAuth.signInAnonymously().catch(function(error) {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.error('login failed', errorCode, errorMessage);
  // });
  console.log('fbAuth.currentUser', fbAuth.currentUser);



}

/** Routes */
export function Root ({ loadGameBoard }) {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={LobbyContainer} onEnter={onLobbyEnter}/>
        <Route path="/game" component={AppContainer} onEnter={loadGameBoard}/>
      </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  loadGameBoard: () => dispatch(loadBoard())
});

export default connect(null, mapDispatchToProps)(Root);
