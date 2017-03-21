import React from 'react';
import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import ModalRootContainer from './Modal/ModalRootContainer';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="app-container">
          <h3>Constantinople</h3>
          <BoardContainer />
          <FooterContainer />
          <ModalRootContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
