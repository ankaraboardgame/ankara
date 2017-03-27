import React from 'react';

import CellContainer from './CellContainer';

const Row = ({ row, merchants }) => {
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
              merchants={merchants}
            />
          );
        })
      }
    </div>
  );
};

export default Row;
