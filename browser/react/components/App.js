import React from 'react';
import Grid from './Grid.js';
import DashFooter from './DashFooter'
// import socket from '../socket'; //Remove soon!!! for testing purpose

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3>Constantinople</h3>
        <Grid />
        <DashFooter />
      </div>
    );
  }
}

export default App;
