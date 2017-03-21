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
              games={props.games}
              merchants={props.merchants}
              openModal={props.openModal}
              closeModal={props.closeModal}
            />
          );
        })
      }
    </div>
  );
};

export default Row;
