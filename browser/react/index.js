import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';
import Lobby from './components/Lobby';
import Grid from './components/Grid';

import App from './components/App.js';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}  />
      <Route path="/lobby" component={Lobby} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
