import React from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeInDown, fadeInDownBig, zoomIn, shake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import ModalRootContainer from './Modal/ModalRootContainer';
import DisplayWinner from './TurnDialogs/DisplayWinner';
import LastTurn from './TurnDialogs/LastTurn';

import PlayerButtons from './PlayerMenu/PlayerButtons';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const animateStyles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '1s'
  },
  fadeInDownBig: {
    animationName: fadeInDownBig,
    animationDuration: '1s'
  },
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '1s'
  },
  shake: {
    animationName: shake,
    animationDuration: '1s'
  }
});

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gameData, gameId, user } = this.props;
    return (
      <MuiThemeProvider>
        {
          gameData && user ?
          <div id="game-container">
            <PlayerButtons gameData={gameData} />
            { gameData.lastRound ? <h3> LAST ROUND</h3> : null}
            <div id="app-container">
              <img className={css(animateStyles.fadeInDown)} src={`images/Constantinople-Title-2.png`} id="game-title" />
              <BoardContainer />
              <FooterContainer
                userId={user.uid}
                gameId={gameId}
                gameData={gameData} />
              <ModalRootContainer gameData={gameData} />
              { 
                gameData.lastRound && gameData.merchants[gameData.playerTurn].number === 0 ?
                <DisplayWinner
                  merchants={merchants}
                /> : null 
              }
            </div>
          </div> :
          <div id="circular-progress">
            <text id="progress-text">Loading your game board...</text>
            <CircularProgress size={100} thickness={7} color="#ee2d00" style={{ border:"4px solid #de9d89", borderRadius: "200px" }}/>
          </div>
        }
      </MuiThemeProvider>
    );
  }
}

const fbGameWrappedContainer = firebaseConnect(({ gameId }) => {
  return [`games/${gameId}`];
})(AppContainer);

const mapStateToProps = ({ user: { user }, game: { id: gameId }, firebase}) => ({
  user: user,
  gameId: gameId,
  merchants: dataToJS(firebase, `games/${gameId}/merchants`),
  gameData: dataToJS(firebase, `games/${gameId}`)
});

export default connect(mapStateToProps)(fbGameWrappedContainer)
