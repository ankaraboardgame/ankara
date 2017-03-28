import React from 'react';
import ReactDice from 'react-dice-complete';
import RaisedButton from 'material-ui/RaisedButton';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rolled: false}
    this.rollAll = this.rollAll.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
  }

  rollAll() {
    this.setState({rolled: true});
    this.reactDice.rollAll();
  }

  rollDoneCallback(num) {
    if (this.state.rolled) {
      this.props.done(num);
    }
  }

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.rollAll}
          disabled={this.state.rolled}
        >
          Roll
        </RaisedButton>
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
    );
  }
}
