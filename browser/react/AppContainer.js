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
import DisplayWinner from './TurnDialogs/DisplayWinner';
import LastTurn from './TurnDialogs/LastTurn';

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
          <div id="game-container">
            <div id="player-box-container">
              { gamesRef.lastRound ? <text>LAST ROUND!</text> : null}
              <img src={'images/player/redplayer.png'} id="player-icons" />
              <img src={'images/player/blueplayer.png'} id="player-icons" />
              <img src={'images/player/greenplayer.png'} id="player-icons" />
              <img src={'images/player/yellowplayer.png'} id="player-icons" />
            </div>
            <div id="app-container">
              <img src={`images/Constantinople-Title-2.png`} id="game-title" />
              <BoardContainer />
              <FooterContainer
                clientId={currentUserId}
                gameId={this.props.gameId}
                gamesRef={gamesRef} />
              <ModalRootContainer gamesRef={gamesRef} />
              { 
                gamesRef.lastRound && gamesRef.merchants[gamesRef.playerTurn].number === 0 ?
                <DisplayWinner
                  merchants={gamesRef.merchants}
                /> : null 
              }
            </div>
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
  gamesRef: dataToJS(state.firebase, `games/${state.game.id}`)
})

export default connect(mapStateToProps)(fbGameWrappedContainer)
