import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import { fbDB, fbAuth } from '../firebase';
import { settingUser } from '../redux/action-creators/user';
import ModalRootContainer from './Modal/ModalRootContainer';
import { connectToSession } from '../routes/lobby';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      const gamesRef = this.props.gamesRef;
      const currentUserId = this.props.user.uid;

      return (
        gamesRef ?
        <MuiThemeProvider>
          <div id="app-container">
            <h3>Constantinople</h3>
            <BoardContainer />
            <FooterContainer clientId={currentUserId} gameId={this.props.gameId} gamesRef={this.props.gamesRef} />
            <ModalRootContainer />
          </div>
        </MuiThemeProvider>
        :
        <h3>Loading...</h3>
      );
    } else {
      return <h4>loading board</h4>
    }
  }
}

const fbGameWrappedContainer = firebaseConnect(({ gameId }) => {
  return [`games/${gameId}`];
})(AppContainer);

const mapStateToProps = (state) => ({
  user: state.user.user,
  gameId: state.game.id,
  firebase: state.firebase,
  gamesRef: dataToJS(state.firebase, `games/${state.game.id}`)
})

export default connect(mapStateToProps)(fbGameWrappedContainer)
