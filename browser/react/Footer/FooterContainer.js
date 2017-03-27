import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

// import DashFooter from './DashFooter';
import NewFooter from './NewFooter';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { userId, gameId, gameData } = this.props;
    return (
      gameData &&
      <NewFooter wheelbarrow={ gameData.merchants[userId].wheelbarrow } gameData={gameData} userId={userId} />
    );
  }
}

export default Footer
