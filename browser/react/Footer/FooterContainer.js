import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import DashFooter from './DashFooter';

class Footer extends Component {
  constructor(props){
    super(props);
    console.log('footer', props)
  }

  render(){
    const playerId = this.props.clientId;
    const gameId = this.props.gameId
    return(
      <DashFooter wheelbarrow={ this.props.gamesRef[gameId].merchants[playerId].wheelbarrow } />
    )
  }
}

export default Footer
