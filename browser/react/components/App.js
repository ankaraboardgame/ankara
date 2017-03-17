import React from 'react';
import Grid from './Grid.js';
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
      </div>
    );
  }
}

export default App;