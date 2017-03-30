import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

import { postGameChat } from '../../routes/chat.js';

/** ----------- Selectors ----------- */
import { getGameId, getGameChats } from '../../redux/reducers/game-reducer';
import { getUserId, getUsername } from '../../redux/reducers/user-reducer';

/** ----------- Container Component ----------- */
import GameHistoryComponent from '../GameHistory/GameHistoryComponent';

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
    const { gameId, userId, username } = this.props;
    event.preventDefault();
    postGameChat(gameId, userId, username, this.state.message)
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
    const { userId, chats, username } = this.props;

    const cardStyle = {
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
        <Card style={ cardStyle } expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={`Chat (${username})`}
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <Tabs>
              <Tab label="Chat" style={{backgroundColor: '#555'}}>

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

              <Tab label="Game log" style={{backgroundColor: '#555'}}>
                <div className="chat-log">
                  <GameHistoryComponent />
                </div>
              </Tab>

            </Tabs>
          </CardText>
        </Card>
      </div>
    )
  }
};

/** ------- Higher Order Component ------- */
const mapStateToProps = state => ({
  username: getUsername(state),
  chats: getGameChats(state),
  gameId: getGameId(state),
  userId: getUserId(state)
});

export default connect(mapStateToProps)(ChatContainer);
