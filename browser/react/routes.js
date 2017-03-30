import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/** -------- Importing components and containers -------- */
import GameContainer from './GameContainer';
import LobbyContainer from './Lobby/LobbyContainer';
import TitlePageContainer from './TitlePage/TitlePageContainer';
import AppContainer from './AppContainer';

/** --------- Routes ------- */
const Root = ({ loadGameBoard }) => {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={TitlePageContainer}/>
          <Route path="/lobby" component={LobbyContainer}/>
          <Route path="/game" component={GameContainer}/>
        </Route>
      </Router>
  );
}

export default Root;
