import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class GameHistoryComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
      this.scrollToBottom();
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  render() {
    const history = _.orderBy(this.props.historyRef, e => e.timestamp);
    return (
      <div>
        { history && Object.keys(history).map(key => {
          return (<p key={key}>{`${history[key].text}`}</p>)
        })}
        <div style={ {float:"left", clear: "both"} }
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}
