import React from 'react';
import ReactDice from 'react-dice-complete';
import RaisedButton from 'material-ui/RaisedButton';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rollCount: 0 }
    this.rollAll = this.rollAll.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
  }

  rollAll() {
    this.reactDice.rollAll();
  }

  rollDoneCallback(num) {
    console.log('rolled', num);
    if (this.state.rollCount > 0) {
      this.props.done(num);
    }
    this.setState({ rollCount: ++this.state.rollCount });
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={this.rollAll}>
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
