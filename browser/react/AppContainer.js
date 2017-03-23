import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import ModalRootContainer from './Modal/ModalRootContainer';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const gamesRef = this.props.gamesRef;
    const currentUserId = this.props.user && this.props.user.uid;

    return (
      <MuiThemeProvider>
      {
        gamesRef && this.props.user ?
        <div id="app-container">
          <h1>Constantinople</h1>
          <p>{ gamesRef.playerMap[gamesRef.playerTurn]} is playing...</p>
          <BoardContainer gamesRef={gamesRef} />
          <FooterContainer
            clientId={currentUserId}
            gameId={this.props.gameId}
            gamesRef={gamesRef}
          />
          <ModalRootContainer gamesRef={gamesRef} />
        </div> :
        <CircularProgress size={60} thickness={7} />
      }
      </MuiThemeProvider>
    );
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
