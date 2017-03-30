import React from 'react';
import ReactDice from 'react-dice-complete';
import RaisedButton from 'material-ui/RaisedButton';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rolled: false,
      prompt: 'Roll',
      rerolling: false,
      rolledSum: 0
    }

    this.rollButtonClicked = false;
    this.doneButtonClicked = false;

    this.rollAll = this.rollAll.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
    this.done = this.done.bind(this);
  }

  rollAll() {
    if ( !this.rollButtonClicked ) {
      this.rollButtonClicked = true;
      this.setState({rolled: true});
      this.reactDice.rollAll();
      this.rollButtonClicked = false;
    }
  }

  done() {
    if ( !this.doneButtonClicked ) {
      this.doneButtonClicked = true;
      this.props.done(this.state.rolledSum);
    }
  }

  rollDoneCallback(num) {

    // No re-roll
    if (this.state.rolled && !this.props.canReroll) {
      this.props.done(num);
    } else { // Can re-roll
      // If player is allowed to re-roll
      if (this.state.rolled && this.props.canReroll && !this.state.rerolling) {
        // Set rolled state to false and store rolled value to rolledSum in case
        // player decide not to re-roll by click on 'Done' button.
        this.setState({
          rolled: false,
          prompt: 'Re-roll',
          rolledSum: num,
          rerolling: true
        });
      }

      // Call this.props.done() after re-roll.
      if (this.state.rolled && this.state.rerolling) {
        this.props.done(num);
      }
    }

  }

  render() {
    const style={ margin: 12 }
    return (
      <div>
        <div id="market-row">
          <RaisedButton
            onClick={this.rollAll}
            style={style}
            disabled={this.state.rolled}
            label={this.state.prompt}
          />
          { this.props.canReroll && this.state.rerolling && <RaisedButton
            style={style}
            onClick={this.done}
            disabled={this.state.rolled}
            label="Done"
          /> }
        </div>
        <div id="market-row">
          <ReactDice
            disableIndividual={true}
            numDice={2}
            rollTime={1}
            rollDone={this.rollDoneCallback}
            ref={dice => this.reactDice = dice}
            faceColor="white"
            dotColor="black"
            outline={true}
            outlineColor="black"
            />
        </div>
      </div>
    );
  }
}
