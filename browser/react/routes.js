import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/** Importing components and containers */
import AppContainer from './AppContainer';
import LobbyContainer from './Lobby/LobbyContainer';
import TitlePage from './TitlePage';

/** Importing action-creators */
import { loadBoard } from '../redux/action-creators/board';

/** Routes */
const Root = ({ loadGameBoard }) => {
  return (
      <Router history={hashHistory}>
        <ReactCSSTransitionGroup
          transitionName="title-anim"
          transitionEnter={false}
          transitionLeave={true}
          transitionLeaveTimeout={300}
        >
          <Route path="/" component={TitlePage}/>
        </ReactCSSTransitionGroup>
        <Route path="/lobby" component={LobbyContainer}/>
        <Route path="/game" component={AppContainer} onEnter={loadGameBoard}/>
      </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadGameBoard: () => dispatch(loadBoard())
});

export default connect(null, mapDispatchToProps)(Root);
