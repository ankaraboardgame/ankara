import React from 'react';
import Grid from './Grid.js';
// import socket from '../socket'; //Remove soon!!! for testing purpose

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="app-container">
        <h3>Constantinople</h3>
        <div id="grid-container">
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;