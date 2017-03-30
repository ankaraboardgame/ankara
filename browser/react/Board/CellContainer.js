import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { dataToJS } from 'react-redux-firebase';

import { cellActiveStatus, canMovePlayer, mapCoordToLocation } from '../../utils/board';
import { openAssistantDialog } from '../../utils/assistants.js';
import { movePlayer } from '../../routes/move';
import { loadModal, hideModal } from '../../redux/action-creators/modals';

/** ---------- Selectors ----------- */
import { getUserId, getUserData, getUserPosition, getUserAssistants } from '../../redux/reducers/user-reducer';
import {
  getGameId, getGameMerchants, getSmuggler, getPlayerTurn, getGemstoneDealerData,
  getGreatMosqueData, getSmallMosqueData, getLargeMarketTile, getSmallMarketTile } from '../../redux/reducers/game-reducer';

import Cell from './Cell';
import Player from '../Pieces/Player';
import Assistant from '../Pieces/Assistant';
import Smuggler from '../Pieces/Smuggler';

/** ---------- Container ------------ */
/**
 * CellContainer wraps each cell component and handles:
 *  * where to draw player/assistant/smuggler buttons
 *  * cell highlighting to indicate possible moves for player
 *  * drag and drop functionality
 */

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const { coords, openModal } = this.props;
    e.preventDefault();
    openModal(
      mapCoordToLocation(coords),
      { zoom: true }
    );
  }

  render() {
    const {
      connectDropTarget,
      isOver,
      name,
      coords,
      gameId,
      userId,
      userPosition,
      playerTurn,
      smuggler,
      merchantsData,
      largeMarketTile,
      smallMarketTile,
      gemstoneDealerData,
      greatMosqueData,
      smallMosqueData,
    } = this.props;

    /**
     * Read data for all players and draw their buttons
     */
    const playerPieces = merchantsData ? Object.keys(merchantsData)
      .map( merchantId => {
        if ( merchantsData[merchantId].position.coordinates === coords) {
          return (
            <Player
              key={merchantId}
              activePlayer={playerTurn}
              currentUser={userId}
              playerId={merchantId}
              playerNum={merchantsData[merchantId].number}
            />
          )
        } else {
          return null;
        }
      })
      .filter(Boolean)
      : [];

    /**
     * Read data for all assistants and draw their buttons
     */
    let assistantPieces = [];
    if (merchantsData){
      for (let merchantId in merchantsData){
        const out = merchantsData[merchantId].assistants.out;
        const outCoords = out && Object.keys(out)
                                       .map(k => out[k])
                                       .filter(asstCoords => asstCoords === coords);
        if (out && outCoords.length) {
          assistantPieces = assistantPieces.concat({
            out: merchantsData[merchantId].assistants.out,
            number: merchantsData[merchantId].number
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
        .map(({ asstCoords, number }) => (
          <Assistant
            key={`${number}-${asstCoords}`}
            playerNum={number}
          />
        ))
    }

    /**
     * Read data for smuggler and draw its button
     */
    const smugglerPiece = smuggler && (coords === smuggler.coordinates) && (
      <Smuggler key="smuggler" />
    )

    /**
     * If it's the player's turn, dim the cells she cannot move to
     */
    let activeStatus;
    let cellActive = cellActiveStatus(
          coords,
          userPosition.coordinates,
          userPosition.possibleMoves
        )
    if (merchantsData && !cellActive && playerTurn === userId) {
      activeStatus = { opacity: '0.2' };
    }

    /**
     * Connect each Cell as a drop-target (React drag-and-drop)
     * and superimpose dives for player, smuggler, and assistants
     */
    return connectDropTarget(
      <div id="cell-container" style={activeStatus}>
        <Cell
          coords={coords}
          name={name}
          largeMarketTile={largeMarketTile}
          smallMarketTile={smallMarketTile}
          gemstoneDealerData={gemstoneDealerData}
          greatMosqueData={greatMosqueData}
          smallMosqueData={smallMosqueData}
          handleOnClick={this.handleOnClick}
        />
        <div className="player-container">
          { playerPieces }
        </div>
        <div className="smuggler-container">
          { smugglerPiece }
        </div>
        <div className="assistant-container">
          { assistantPieces }
        </div>
        { isOver && <div className="player-hover-overlay" /> }
      </div>
    );
  }
}

/** ----------- Higher Order Components ----------- */

const cellTarget = {
  canDrop({ coords, userPosition }) {
    return canMovePlayer(coords, userPosition.possibleMoves);
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

const mapStateToProps = (state, { name, coords, cellPossibleMoves }) => ({
  gameId: getGameId(state),
  userId: getUserId(state),
  smuggler: getSmuggler(state),
  playerTurn: getPlayerTurn(state),
  userPosition: getUserPosition(state),
  userAssistants: getUserAssistants(state),
  merchantsData: getGameMerchants(state),
  largeMarketTile: getLargeMarketTile(state),
  smallMarketTile: getSmallMarketTile(state),
  gemstoneDealerData: getGemstoneDealerData(state),
  greatMosqueData: getGreatMosqueData(state),
  smallMosqueData: getSmallMosqueData(state),
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
