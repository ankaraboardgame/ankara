import React from 'react';
import BoardContainer from '../containers/BoardContainer';
import DashFooter from './DashFooter';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="app-container">
        <h3>Constantinople</h3>
        <BoardContainer />
        <DashFooter />
      </div>
    );
  }
}

export default App;
