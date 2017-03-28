import React from 'react';

class SmugglerEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.talkToSmuggler = talkToSmuggler.bind(this);
    this.handleSmugglerGoodClick = handleSmugglerGoodClick.bind(this);
    this.handleSmugglerPayClick = handleSmugglerPayClick.bind(this);
  }

  render() {
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>Here be the smuggler!<br /><br />You can get a resource of your choice<br />But! You must give him 2 lira or a random good of your choice in return...</p>
        </div>
        <div id="market-row">
          <RaisedButton
            label={`Talk to smuggler`}
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={this.talkToSmuggler}
            disabled={!this.canTalkToSmuggler(this.props.playerId, this.props.merchants)}
          />
          <RaisedButton
            label="End turn now"
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={this.handleEndTurn}
          />
        </div>
      </div>
    );
  }
};

export default SmugglerEncounter;
