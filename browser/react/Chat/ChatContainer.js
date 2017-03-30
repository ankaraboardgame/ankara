import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

import { postGameChat } from '../../routes/chat.js';

/************ Container ****************/

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      expanded: false,
      unread: false
    };

    this.chat = new Audio('sounds/chat.wav');
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleTextField = this.handleTextField.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle (){
    this.setState({ expanded: !this.state.expanded});
  }

  handleExpandChange (expanded) {
    this.setState({expanded: expanded});
    if (expanded) {
      this.setState({ unread: false })
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
      if (!this.state.expanded){
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

    const chatStyle = {
      width: 350,
      padding: 0,
      margin: 0,
      backgroundColor: this.state.unread ? 'salmon' : 'wheat',
      display: 'inline-block',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15
    };

    return (
        <div className="chat-container">
          <Card style={ chatStyle } expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
              title={`Chat (${userName})`}
              actAsExpander={true}
              showExpandableButton={true}
              onClick={this.handleToggle}
            />

            <CardText expandable={true}>
              <Tabs>
                <Tab label="Chat" onClick={this.handleToggle}>

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
                      style={{ marginLeft: 5, width: 300 }} />
                    <div style={{ textAlign: 'center' }}>
                      <RaisedButton disabled={!this.state.message.trim().length} type="submit">
                        SEND
                      </RaisedButton>
                    </div>
                  </form>

                </Tab>
                <Tab label="Game log">

                  <CardText expandable={true}>

                    <div className="game-log">
                      game log goes here
                    </div>

                  </CardText>
                </Tab>
              </Tabs>
            </CardText>
          </Card>
        </div>
    )
  }

}

export default ChatContainer;
