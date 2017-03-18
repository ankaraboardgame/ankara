import React from 'react';
// import Grid from './Grid';
import DashFooter from './DashFooter';

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
        <DashFooter />
      </div>
    );
  }
}

export default App;
