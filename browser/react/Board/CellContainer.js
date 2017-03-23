import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { firebaseConnect } from 'react-redux-firebase';

import { cellActiveStatus, canMovePlayer, assistantOnLocation } from '../../utils';
import { movePlayer } from '../../routes/move';
import { DROP_ASSISTANT, PICK_UP_ASSISTANT } from '../Modal/turn_dialog_types';

import Cell from './Cell';
import Player from '../Pieces/Player';

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    const currentUserId = this.props.user.uid;
    const merchants = this.props.merchants;

    const playerPieces = merchants && Object.keys(merchants)
      .map( (merchantId) => {
        if ( merchants[merchantId].position.coordinates === this.props.coords) {
          return (
            <Player
              key={merchantId}
              activePlayer={this.props.game.playerTurn}
              currentUser={this.props.user}
              playerId={merchantId}
              playerNum={merchants[merchantId].number}
            />
          )
        } else {
          return null;
        }
      })
      .filter(Boolean);

    const { connectDropTarget, isOver } = this.props;

    // There should only be one merchant that matches current user
    const userMerchant = merchants[currentUserId];
    const activeStatus = this.props.merchants && (this.props.game.playerTurn === currentUserId) ?
      (cellActiveStatus(
        this.props.coords,
        userMerchant.position.coordinates,
        userMerchant.position.possibleMoves
        ) ?
        null : {opacity: '0.2'}) : null;

    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={this.props.coords}
          name={this.props.name}
        />
        <div id="player-container">
          { playerPieces }
        </div>
        { isOver && <div id="player-hover-overlay" /> }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user.user,
  name: ownProps.name,
  coords: ownProps.coords,
  possibleMoves: ownProps.cellPossibleMoves,
  game: ownProps.game,
  merchants: ownProps.merchants
});

const cellTarget = {
  canDrop(props) {
    return canMovePlayer(props.coords, props.merchants[props.user.uid].position.possibleMoves);
  },
  drop(props) {
    if (assistantOnLocation(props.coords, props.merchants[props.user.uid].assistants)) {
      props.openModal(PICK_UP_ASSISTANT, { currentPosition: props.coords});
    } else {
      props.openModal(DROP_ASSISTANT, { currentPosition: props.coords});
    }
    movePlayer(props.gameId, props.user.uid, props.coords, props.cellPossibleMoves);
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
