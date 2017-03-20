import React from 'react';

import CellContainer from './CellContainer';

const Row = props => {
  return (
    <div id="row-container">
      {
        props.row && props.row.map(cell => {
          return (
            <CellContainer
              key={cell.coords}
              name={cell.name}
              coords={cell.coords}
              cellPossibleMoves={cell.possibleMoves}
              players={props.players}
              movePlayerPiece={props.movePlayerPiece}
              positions={props.positions}
              games={props.games}
            />
          );
        })
      }
    </div>
  );
};

export default Row;
