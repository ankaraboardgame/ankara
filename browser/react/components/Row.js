import React from 'react';

import Cell from './Cell';

const Row = props => {
  return (
    <div id="row-container">
      {
        props.row && props.row.map(cell => {
          return (
            <Cell
              key={cell.coords}
              name={cell.name}
              coords={cell.coords}
              handleMouseOver={props.handleMouseOver}
              possibleMoves={cell.possibleMoves}
              moves={props.moves}
            />
          );
        })
      }
    </div>
  );
}

export default Row;
