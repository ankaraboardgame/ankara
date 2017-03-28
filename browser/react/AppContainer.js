import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'

import CircularProgress from 'material-ui/CircularProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fadeInDown, fadeInDownBig, zoomIn, shake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import ModalRootContainer from './Modal/ModalRootContainer';

import DisplayWinner from './TurnDialogs/DisplayWinner';
import LastTurn from './TurnDialogs/LastTurn';
import PlayerButtons from './PlayerMenu/PlayerButtons';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/** ----------- Selectors ----------- */
import { getGameId, getGameMerchants, getPlayerTurn, getLastRound } from '../redux/reducers/game-reducer';
import { getUserId } from '../redux/reducers/user-reducer';

const animateStyles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
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
    this.coins = new Audio('sounds/coins.wav');
    this.coins = new Audio('sounds/chimes.mp3');
  }

  renderLoadingScreen() {
    return (
      <div id="circular-progress">
        <text id="progress-text">Loading your game board...</text>
        <CircularProgress size={100} thickness={7} color="#ee2d00" style={{ border:"4px solid #de9d89", borderRadius: "200px" }}/>
      </div>
    );
  }

  /** For Audio */
  componentWillReceiveProps(nextProps) {
    if (this.props.merchants){
      if (nextProps.merchants[nextProps.userId].wheelbarrow.money !== this.props.merchants[this.props.userId].wheelbarrow.money) {
        this.coins.play();
      }
      if (nextProps.merchants[nextProps.userId].wheelbarrow.ruby !== this.props.merchants[this.props.userId].wheelbarrow.ruby) {
        this.chimes.play();
      }
    }
  }

  render() {
    const { userId, merchants, playerTurn, lastRound } = this.props;
    return (
      <MuiThemeProvider>
        {
          merchants && userId ?
          <div id="game-container">
            <PlayerButtons />
            { lastRound ? <h3> LAST ROUND</h3> : null}
            <div id="app-container">
              <img className={css(animateStyles.fadeInDown)} src={`images/Constantinople-Title-2.png`} id="game-title" />
              <BoardContainer />
              <FooterContainer />
              <ModalRootContainer />
              { 
                lastRound && merchants[playerTurn].number === 0 ?
                <DisplayWinner
                  merchants={merchants}
                /> : null 
              }
            </div>
          </div> : this.renderLoadingScreen()
        }
      </MuiThemeProvider>
    );
  }
}

const fbGameWrappedContainer = firebaseConnect(({ gameId }) => ([`games/${gameId}`]))(AppContainer);

const mapStateToProps = state => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  merchants: getGameMerchants(state),
  playerTurn: getPlayerTurn(state),
  lastRound: getLastRound(state)
});

export default connect(mapStateToProps)(fbGameWrappedContainer)
