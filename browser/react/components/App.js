import React from 'react';
import Grid from './Grid.js';

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