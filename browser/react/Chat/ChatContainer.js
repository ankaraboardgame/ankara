import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { postGameChat } from '../../routes/chat.js';

/************ Container ****************/

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      shouldDisplay: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleTextField = this.handleTextField.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
  }

  handleToggle(){
    const currState = this.state.shouldDisplay;
    this.setState({shouldDisplay: !currState})
  }

  handleTextField(event){
    this.setState({ message: event.target.value })
  }

  handlePostMessage(event){
    event.preventDefault();
    postGameChat(this.props.gameId, this.props.userId, this.props.userName, this.state.message)
    .then(() => this.setState({ message: '' }))
    .catch(console.error);
  }

  render() {
    const { userId, chats, userName } = this.props;

    const paperStyle = {
      width: 300,
      height: 400,
      padding: 10,
      margin: 0,
      backgroundColor: '#DABE96',
      display: 'inline-block'
    };

    return (
      <div>
      <div className="chat-icon" onClick={this.handleToggle}>
        <img className="chat-icon" src="images/chat.png" />
      </div>
      {
        this.state.shouldDisplay &&
        (
          <div className="chat-container">
            <Paper style={ paperStyle }>
              <Subheader>Posting as: {userName}</Subheader>

              <div className="chat-log">

                <List>
                {
                  chats
                  .map((chat, i) => {
                    return (
                      <ListItem key={i}>
                        <span style={{fontWeight: 'bold'}}>
                          {chat.name}
                        </span>: {chat.message}
                      </ListItem>
                    )
                  })
                }
                </List>

              </div>

              <form onSubmit={this.handlePostMessage}>
                <TextField
                  onChange={this.handleTextField}
                  hintText="Message..."
                  style={{ marginLeft: 15 }} />
                <div style={{ textAlign: 'center' }}>
                  <RaisedButton disabled={!this.state.message.trim().length} type="submit">
                    SEND
                  </RaisedButton>
                </div>
              </form>
            </Paper>
          </div>
        )
      }
      </div>
    )
  }

}

export default ChatContainer;
