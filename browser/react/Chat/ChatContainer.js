import React from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import { postGameChat } from '../../routes/chat.js';

/************ Container ****************/

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      shouldDisplay: false,
      unread: false
    };

    this.chat = new Audio('sounds/chat.wav');
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTextField = this.handleTextField.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
  }

  handleToggle(){
    const currState = this.state.shouldDisplay;
    if (currState === false){
      this.setState({
        shouldDisplay: true,
        unread: false
      })
    } else {
      this.setState({shouldDisplay: false})
    }
  }

  handleTextField(event){
    this.setState({ message: event.target.value })
  }

  handlePostMessage(event){
    event.preventDefault();
    postGameChat(this.props.gameId, this.props.userId, this.props.userName, this.state.message)
    this.setState({ message: '' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chats.length !== this.props.chats.length){
      this.chat.play();
      if (this.state.shouldDisplay === false){
        this.setState({ unread: true });
      }
    }
  }

  componentDidUpdate(){
    // if chatbox is open, scroll as new messages come along
    var len = this.props.chats.length - 1;
    const lastMessage = ReactDOM.findDOMNode(this['_chat' + len]);
    if (lastMessage) lastMessage.scrollIntoView();
  }

  render() {
    const { userId, chats, userName } = this.props;

    const paperStyle = {
      width: 300,
      height: 500,
      padding: 10,
      margin: 0,
      backgroundColor: '#DABE96',
      display: 'inline-block'
    };

    return (
      <div>
      <div className={`chat-icon ${this.state.unread && 'unread'}`} onClick={this.handleToggle}>
        <img className="chat-icon" src="images/chat.png" />
      </div>
      {
        this.state.shouldDisplay &&
        (
          <div className="chat-container">
            <Paper style={ paperStyle }>
              <Subheader>Posting as: {userName}</Subheader>

              <div className="chat-log">

                <ul className="chat-list">
                {
                  chats
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((chat, i) => {
                    return (
                      <li key={i} ref={(ref) => this['_chat' + i] = ref} className="chat-message">
                        <span style={{fontWeight: 'bold'}}>
                          {chat.name}
                        </span>: {chat.message}
                      </li>
                    )
                  })
                }
                </ul>

              </div>

              <form onSubmit={this.handlePostMessage}>
                <TextField
                  onChange={this.handleTextField}
                  value={this.state.message}
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
