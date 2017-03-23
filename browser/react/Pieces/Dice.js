import React from 'react';
import ReactDice from 'react-dice-complete';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.rollAll = this.rollAll.bind(this);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
  }
  rollAll() {
    this.reactDice.rollAll();
  }

  rollDoneCallback(num) {
    console.log('rolled:', num);
  }

  render() {
    return (
      <div>
        <ReactDice
          disableIndividual={true}
          numDice={2}
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
