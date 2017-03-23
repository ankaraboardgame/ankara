import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import DashFooter from './DashFooter';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const playerId = this.props.clientId;
    const gameId = this.props.gameId;
    const gamesRef = this.props.gamesRef;
    return(
        gamesRef &&
        <DashFooter wheelbarrow={ gamesRef.merchants[playerId].wheelbarrow } gamesRef={gamesRef} playerId={playerId} />
    )
  }
}

export default Footer
