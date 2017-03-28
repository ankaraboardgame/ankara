import React from 'react';

import CellContainer from './CellContainer';

/** -------- Component ---------- */
/**
 * Creates cells for each location in the game
*/
const Row = ({ row }) => {
  return (
    <div id="row-container">
      {
        row && row.map(cell => {
          return (
            <CellContainer  
              key={cell.coords}
              name={cell.name}
              coords={cell.coords}
              cellPossibleMoves={cell.possibleMoves}
            />
          );
        })
      }
    </div>
  );
};

export default Row;
