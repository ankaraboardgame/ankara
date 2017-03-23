import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    // How would you handle 'end turn' and 'drop/pick up assistant'? Need to know how to connect to firebase store.
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.location}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}