import React from 'react';

class DropAssistant extends React.Component {

  render() {
    return (
      <div id="turn-dialog-half">
        <RaisedButton
          label="Drop an assistant"
          style={{ margin: 12 }}
          primary={true}
          onTouchTap={() => this.handleAssistant('drop')}
          disabled={!modalPayload.assistantCount}
        />
        <RaisedButton
          label="End turn now"
          style={{ margin: 12 }}
          secondary={true}
          onTouchTap={this.handleEndTurn}
        />
      </div>
    );
  }
};

export default DropAssistant;
