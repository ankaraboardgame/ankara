import React from 'react';
import BoardContainer from '../containers/BoardContainer';
import FooterContainer from './Footer/FooterContainer';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor() {
    super();
  }

  // handleOnTap(event){
  //
  // }

  render() {
    return (
      <MuiThemeProvider>
        <div id="app-container">
          <h3>Constantinople</h3>
          <BoardContainer />
          <FooterContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
