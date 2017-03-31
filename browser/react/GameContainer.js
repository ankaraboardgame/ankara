import React from 'react';
import { connect } from 'react-redux';
import { fadeInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/** -------- Importing Components --------- */
import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import ModalRootContainer from './Modal/ModalRootContainer';
import ChatContainer from './Chat/ChatContainer.js';
import PlayerButtonsContainer from './PlayerMenu/PlayerButtonsContainer';

import DisplayWinnerContainer from './EndGame/DisplayWinnerContainer';
import LastTurn from './EndGame/LastTurn';

/** -------- Material-UI Plugins -------- */
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/** ----------- Selectors ----------- */
import { getUserId } from '../redux/reducers/user-reducer';
import { getGameMerchants } from '../redux/reducers/game-reducer';

/** ------ Animation Styles -------- */
const animateStyles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '1s'
  }
});

/** -------- Container ---------- */
class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userId, merchants } = this.props;

    return (
      <MuiThemeProvider>
        {
          userId && merchants ?
          <div id="game-container">
            <PlayerButtonsContainer />
            <LastTurn />
            <div id="app-container">
              <img className={css(animateStyles.fadeInDown)} src={`images/Ankara-Title.png`} id="game-title" />
              <BoardContainer />
              <FooterContainer />
              <ModalRootContainer />
              <DisplayWinnerContainer />
            </div>
            <ChatContainer />
          </div> : this.renderLoadingScreen()
        }
      </MuiThemeProvider>
    );
  }

  renderLoadingScreen() {
    return (
      <div id="circular-progress">
        <text id="progress-text">Loading your game board...</text>
        <CircularProgress size={100} thickness={7} color="#ee2d00" style={{ border:"4px solid #de9d89", borderRadius: "200px" }}/>
      </div>
    );
  }
};

/** -------- Higher order component -------- */
const mapStateToProps = state => ({
  userId: getUserId(state),
  merchants: getGameMerchants(state)
});

export default connect(mapStateToProps)(GameContainer);
