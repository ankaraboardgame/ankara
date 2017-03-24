import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import GameHistoryComponent from './GameHistoryComponent';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

class GameHistorySideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  };

  render() {
    return (
      <div>
        <RaisedButton
          label="Game Log"
          secondary={ true }
          onTouchTap={this.handleToggle} />
        <Drawer
          width={350}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <GameHistoryComponent historyRef={this.props.historyRef} userId={this.props.userId} />
        </Drawer>
      </div>
    );
  }
}

const fbHistoryContainer = firebaseConnect(({ gameId }) => {
  return [`gameHistory/${gameId}`];
})(GameHistorySideBar);

const mapStateToProps = (state) => ({
  userId: state.user.user.uid,
  gameId: state.game.id,
  firebase: state.firebase,
  historyRef: dataToJS(state.firebase, `gameHistory/${state.game.id}`)
})

export default connect(mapStateToProps)(fbHistoryContainer)
