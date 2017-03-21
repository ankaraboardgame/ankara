import React from 'react';
import BoardContainer from './Board/BoardContainer';
import FooterContainer from './Footer/FooterContainer';
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import { fbDB, fbAuth } from '../firebase';
import { settingUser } from '../redux/action-creators/user';
import { connectToGame } from '../routes/lobby';

// PLUGIN required for Material-UI. Provides an onTouchTap() event handler.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleOnTap(event){
  //
  // }

  componentDidMount() {
    //enterGame
    connectToGame(this.props.user.uid);
    console.log('connecting to game with user id of', this.props.user.uid);

  }


  render() {

    const gameSession = this.props.gameSession;
    const currentUserId = this.props.user.uid;

    return (
      gameSession && gameSession.full && gameSession.connectedPlayers[currentUserId] ?
      <MuiThemeProvider>
        <div id="app-container">
          <h3>Constantinople</h3>
          <BoardContainer />
          <FooterContainer />
        </div>
      </MuiThemeProvider>
      :
      <h3>Sorry</h3>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user.user,
  gameSession: dataToJS(state.firebase, 'session')
})

const mapDispatchToProps = (dispatch) =>({
  connectToGame: (userId) => dispatch()
})

const gameSession = firebaseConnect(['session'])(AppContainer)
export default connect(mapStateToProps, mapDispatchToProps)(gameSession)
