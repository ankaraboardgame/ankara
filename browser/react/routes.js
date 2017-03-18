import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { connect } from 'react-redux';

/** Importing components and containers */
import App from './components/App';
import Lobby from './components/Lobby';

/** Importing action-creators */
import { loadBoard } from '../redux/action-creators/board';


/** Routes */
export function Root ({ loadGameBoard }) {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Lobby}/>
        <Route path="/game" component={App} onEnter={loadGameBoard}/>
      </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  loadGameBoard: () => dispatch(loadBoard())
});

export default connect(null, mapDispatchToProps)(Root);
