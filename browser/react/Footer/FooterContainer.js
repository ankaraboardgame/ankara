import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import DashFooter from './DashFooter';

class Footer extends Component {
  constructor(props){
    super(props);
    console.log('footer', props)
    this.state = {
      wb_length: 3,
      fruits: 0,
      fabric: 0,
      spices: 0,
      gems: 0,
      money: 0,
      ruby: 0
    }
  }

  render(){
    return(
      <DashFooter wbstate={ this.state } />
    )
  }
}

export default Footer
