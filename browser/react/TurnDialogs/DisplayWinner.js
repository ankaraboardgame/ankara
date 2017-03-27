import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';
import GameSummary from './GameSummary';

import { whoIsWinner } from '../../utils/winner';
import { hideModal } from '../../redux/action-creators/modals';

class DisplayWinner extends React.Component {
  constructor(props) {
    super(props);

    this.handleEndGame = this.handleEndGame.bind(this);
  }

  handleEndGame (){
    this.props.closeModal();
  }

  render() {
    const winner = whoIsWinner(this.props.merchants);
    return (
      <Modal>
        <div id="winner-container">
          <div id="winner-text-box">
            <text id="winner-text">Winner is {winner.id}</text>
          </div>
          <GameSummary merchants={this.props.merchants} />
          <div id="end-game-btn">
            <RaisedButton label="End Game" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndGame}  />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  merchants: ownProps.merchants
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWinner);
