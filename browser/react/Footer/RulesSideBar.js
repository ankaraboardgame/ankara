import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

export default class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Player Rules"
          secondary={ true }
          onTouchTap={this.handleToggle} />
        <Drawer
          width={550}
          openSecondary={true}
          open={this.state.open}>
          <img src="./images/player_help_card.png" />
        </Drawer>
      </div>
    );
  }
}
