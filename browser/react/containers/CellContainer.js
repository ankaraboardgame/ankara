import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import { cellActiveStatus, canMovePlayer } from '../../utils';

import Cell from '../components/Cell';
import Player from '../components/Player';

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playerPiece = (this.props.positions['playerOne'].position === this.props.coords) ? <Player /> : null;
    const { connectDropTarget, isOver } = this.props;
    const activeStatus = cellActiveStatus(this.props.coords, this.props.positions['playerOne'].position, this.props.positions['playerOne'].possibleMoves) ? null : {opacity: '0.2'};
    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={this.props.coords}
          name={this.props.name}
        />
        {playerPiece}
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
  handleMouseOver: ownProps.handleMouseOver,
  possibleMoves: ownProps.cellPossibleMoves,
  positions: state.player.positions
});

const cellTarget = {
  canDrop(props) {
    return canMovePlayer(props.coords, props.positions['playerOne'].possibleMoves);
  },
  drop(props) {
    props.movePlayerPiece('playerOne', props.coords, props.cellPossibleMoves);
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
