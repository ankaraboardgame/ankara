import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { dataToJS } from 'react-redux-firebase';

import { cellActiveStatus, canMovePlayer, mapCoordToLocation } from '../../utils';
import { openAssistantDialog } from '../../utils/assistants.js'
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
    const {
      gameData,
      userId,
      name,
      connectDropTarget,
      isOver,
      coords,
      merchants,
      selfData,
      gameData: { smuggler, playerTurn }
    } = this.props;
    const playerPieces = merchants ? Object.keys(merchants)
      .map( merchantId => {
        if ( merchants[merchantId].position.coordinates === coords) {
          return (
            <Player
              key={merchantId}
              activePlayer={playerTurn}
              currentUser={userId}
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
        .map(({ out, number }) => {
          return {
            asstCoords: Object.keys(out).map(key => out[key])[0],
            number
          }
        })
        .map(({ asstCoords, number }) => (<Assistant key={`${number}-${asstCoords}`} playerNum={number} />))
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
    if (merchants && !cellActive && playerTurn === userId) {
      activeStatus = { opacity: '0.2' };
    }

    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={coords}
          name={name}
          handleOnClick={this.handleOnClick}
          gameData={gameData}
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
  canDrop({ coords, selfData: { position: { possibleMoves } } }) {
    return canMovePlayer(coords, possibleMoves);
  },
  drop(props) {
    const { gameId, userId, coords, cellPossibleMoves } = props;
    openAssistantDialog(props);
    movePlayer(gameId, userId, coords, cellPossibleMoves);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

const mapStateToProps = ({ user: { user: { uid: userId } }, game: { id: gameId }, firebase }, { name, coords, cellPossibleMoves, merchants }) => ({
  gameData: dataToJS(firebase, `games/${gameId}`),
  gameId: gameId,
  selfData: merchants[userId],
  userId: userId,
  merchants: merchants,
  name: name,
  coords: coords,
  possibleMoves: cellPossibleMoves,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget('player', cellTarget, collect)
)(CellContainer);
