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
          label="Rules"
          default={ true }
          onTouchTap={this.handleToggle} />
        <Drawer
          containerStyle={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center', boxShadow: 'none'}}
          width={400}
          openSecondary={true}
          open={this.state.open}>
          <img src="./images/player_help_card.png" style={{width: '400px'}}/>
        </Drawer>
      </div>
    );
  }
}
