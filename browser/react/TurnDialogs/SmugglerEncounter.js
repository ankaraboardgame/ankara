import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { encounterSmuggler } from '../../routes/encounter';
import { canTalkToSmuggler, handleSmuggler } from '../../utils/smuggler';

class SmugglerEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goodWanted: null,
      trade: null
    }

    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmugglerGoodWantedClick = this.handleSmugglerGoodWantedClick.bind(this);
    this.handleSmugglerGoodToTrade = this.handleSmugglerGoodToTrade.bind(this);
    this.tradeWithSmuggler = this.tradeWithSmuggler.bind(this);

  }


  handleSmugglerGoodWantedClick(event) {
    const good = event.target.id;
    this.setState({ goodWanted: good });
  }

  handleSmugglerGoodToTrade(event) {
    const trade = event.target.id;
    this.setState({ trade });
  }

  tradeWithSmuggler() {
    const { gameId, playerId, handleEndTurn } = this.props;
    encounterSmuggler( gameId, playerId, this.state.goodWanted, this.state.trade)
    .then(handleEndTurn);
  }

  render() {
    const { userWheelbarrow, handleEndTurn } = this.props;
    const selectedGoodWanted = this.state.goodWanted;
    const selectedGoodToTrade = this.state.trade;
    const selectedClassName = 'highlighted';
    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You can get a resource of your choice<br />But! You must give him 2 lira or a random good</p>
        </div>
        <div id="text-box">
          <p>Select your resource</p>
        </div>
        <div id="market-row">
          { userWheelbarrow.fabric < userWheelbarrow.size &&
            <img id="fabric"
                src="./images/cart/fabric.png"
                onTouchTap={this.handleSmugglerGoodWantedClick}
                className={selectedGoodWanted === 'fabric' && selectedClassName} /> }
          { userWheelbarrow.fruit < userWheelbarrow.size &&
            <img id="fruit"
                src="./images/cart/fruits.png"
                onTouchTap={this.handleSmugglerGoodWantedClick}
                className={selectedGoodWanted === 'fruit' && selectedClassName} /> }
          { userWheelbarrow.spice < userWheelbarrow.size &&
            <img id="spice"
                src="./images/cart/spices.png"
                onTouchTap={this.handleSmugglerGoodWantedClick}
                className={selectedGoodWanted === 'spice' && selectedClassName} /> }
          { userWheelbarrow.heirloom < userWheelbarrow.size &&
            <img id="heirloom"
                src="./images/cart/heirlooms.png"
                onTouchTap={this.handleSmugglerGoodWantedClick}
                className={selectedGoodWanted === 'heirloom' && selectedClassName} /> }
        </div>
        <div id="text-box">
          <p>Select how you would like to pay smuggler</p>
        </div>
        <div id="market-row">
          { userWheelbarrow.fabric > 0 &&
          <img id="fabric"
              src="./images/cart/fabric.png"
              onTouchTap={this.handleSmugglerGoodToTrade}
              className={selectedGoodToTrade === 'fabric' && selectedClassName} /> }
          { userWheelbarrow.fruit > 0 &&
          <img id="fruit"
              src="./images/cart/fruits.png"
              onTouchTap={this.handleSmugglerGoodToTrade}
              className={selectedGoodToTrade === 'fruit' && selectedClassName} /> }
          { userWheelbarrow.spice > 0 &&
          <img id="spice"
              src="./images/cart/spices.png"
              onTouchTap={this.handleSmugglerGoodToTrade}
              className={selectedGoodToTrade === 'spice' && selectedClassName} /> }
          { userWheelbarrow.heirloom > 0 &&
          <img id="heirloom"
              src="./images/cart/heirlooms.png"
              onTouchTap={this.handleSmugglerGoodToTrade}
              className={selectedGoodToTrade === 'heirloom' && selectedClassName} /> }
          { userWheelbarrow.money >= 2 &&
          <img id="lira"
              src="./images/money/two_lira.png"
              onTouchTap={this.handleSmugglerGoodToTrade}
              className={selectedGoodToTrade === 'lira' && selectedClassName} /> }
        </div>
      <div id="market-row">
          <RaisedButton
            label={`Trade with Smuggler`}
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={this.tradeWithSmuggler}
            disabled={!this.canTalkToSmuggler(userWheelbarrow)}
          />
          <RaisedButton
            label="End turn now"
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={handleEndTurn}
          />
        </div>
      </div>
    );
  }
};

export default SmugglerEncounter;
