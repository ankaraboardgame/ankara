import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { firebaseConnect } from 'react-redux-firebase';

import { cellActiveStatus, canMovePlayer } from '../../utils';
import { movePlayer } from '../../routes/move';
import { DROP_ASSISTANT, PICK_UP_ASSISTANT } from '../Modal/turn_dialog_types';

import Cell from './Cell';
import Player from '../Pieces/Player';

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const playerPiece = (
      this.props.merchants && 
      this.props.merchants['player1'].position.coordinates === this.props.coords
      ) ? 
      <Player /> : null;

    const { connectDropTarget, isOver } = this.props;

    const activeStatus = this.props.merchants &&
      cellActiveStatus(
        this.props.coords,
        this.props.merchants['player1'].position.coordinates,
        this.props.merchants['player1'].position.possibleMoves
        ) ?
        null : {opacity: '0.2'};

    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={this.props.coords}
          name={this.props.name}
        />
        <div id="player-container">
          {playerPiece}
        </div>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow'
          }} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.name,
  coords: ownProps.coords,
  possibleMoves: ownProps.cellPossibleMoves,
  games: ownProps.games,
  merchants: ownProps.merchants
});

const cellTarget = {
  canDrop(props) {
    return canMovePlayer(props.coords, props.merchants['player1'].position.possibleMoves);
  },
  drop(props) {
    props.openModal(DROP_ASSISTANT, { currentPosition: props.coords});
    movePlayer('player1', props.coords, props.cellPossibleMoves);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

export default compose(
  DropTarget('player', cellTarget, collect),
  connect(mapStateToProps)
)(CellContainer);
