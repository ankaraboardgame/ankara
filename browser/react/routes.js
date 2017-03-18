import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { connect } from 'react-redux';

/** Importing components and containers */
import App from './components/App';
import Lobby from './components/Lobby';

/** Routes */
export function Root (props) {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Lobby}/>
        <Route path="/game" component={App}/>
      </Router>
  );
}

export default connect(null)(Root);
