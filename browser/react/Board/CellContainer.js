import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { dataToJS } from 'react-redux-firebase';

import { cellActiveStatus, canMovePlayer, mapCoordToLocation } from '../../utils';
import { openAssistantDialog } from '../../utils/assistants.js';
import { movePlayer } from '../../routes/move';
import { loadModal, hideModal } from '../../redux/action-creators/modals';

import Cell from './Cell';
import Player from '../Pieces/Player';
import Assistant from '../Pieces/Assistant';
import Smuggler from '../Pieces/Smuggler';

/******************* Container ********************/

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.openModal(
      mapCoordToLocation(this.props.coords),
      { zoom: true }
    );
  }

  render() {
    const currentUserId = this.props.user.uid;
    const smuggler = this.props.game.smuggler;
    const playerTurn = this.props.game.playerTurn;
    const game = this.props.game;
    const {
      gamesRef,
      user,
      name,
      connectDropTarget,
      isOver,
      coords,
      merchants,
      selfData
    } = this.props;

    const playerPieces = merchants ? Object.keys(merchants)
      .map( merchantId => {
        if ( merchants[merchantId].position.coordinates === coords) {
          return (
            <Player
              key={merchantId}
              activePlayer={playerTurn}
              currentUser={user}
              playerId={merchantId}
              playerNum={merchants[merchantId].number}
            />
          )
        } else {
          return null;
        }
      })
      .filter(Boolean)
      : [];

    let assistantPieces = [];
    if (merchants){
      for (let key in merchants){
        const out = merchants[key].assistants.out;
        const outCoords = out && Object.keys(out)
                                       .map(k => out[k])
                                       .filter(asstCoords => asstCoords === coords);
        if (out && outCoords.length) {
          assistantPieces = assistantPieces.concat({
            out: merchants[key].assistants.out,
            number: merchants[key].number
          })
        }
      }
      assistantPieces = assistantPieces
        .map(({out, number}) => {
          return {
            asstCoords: Object.keys(out).map(key => out[key])[0],
            number
          }
        })
        .map(({asstCoords, number}) => (<Assistant key={`${number}-${asstCoords}`} playerNum={number} />))
    }

    const smugglerPiece = smuggler && (coords === smuggler.coordinates) && (
      <Smuggler key={'smuggler'} />
    )

    // There should only be one merchant that matches current user
    let activeStatus;
    let cellActive = cellActiveStatus(
          coords,
          selfData.position.coordinates,
          selfData.position.possibleMoves
        )
    if (merchants && !cellActive && game.playerTurn === currentUserId) {
      activeStatus = { opacity: '0.2' };
    }

    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={coords}
          name={name}
          handleOnClick={this.handleOnClick}
          gamesRef={gamesRef}
        />
        <div className="player-container">
          { [...playerPieces] }
        </div>
        <div className="smuggler-container">
          { [smugglerPiece] }
        </div>
        <div className="assistant-container">
          { [...assistantPieces] }
        </div>
        { isOver && <div className="player-hover-overlay" /> }
      </div>
    );
  }
}

/**************** Higher Order Component *****************/

const cellTarget = {
  canDrop(props) {
    return canMovePlayer(props.coords, props.selfData.position.possibleMoves);
  },
  drop(props) {
    openAssistantDialog(props);
    movePlayer(props.gameId, props.user.uid, props.coords, props.cellPossibleMoves);
  }
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user.user,
  name: ownProps.name,
  coords: ownProps.coords,
  possibleMoves: ownProps.cellPossibleMoves,
  game: ownProps.game,
  merchants: ownProps.merchants,
  selfData: ownProps.merchants[state.user.user.uid],
  gamesRef: dataToJS(state.firebase, `games/${state.game.id}`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget('player', cellTarget, collect)
)(CellContainer);
