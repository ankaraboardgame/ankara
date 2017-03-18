import React from 'react';

import { cellActiveStatus } from '../../utils';

const Cell = props => {
  const activeStyle = cellActiveStatus(props.coords, props.moves) ? null : {opacity: '0.2'};
  return (
    <div onMouseOver={() => {props.handleMouseOver(props.possibleMoves)}} id="cell-container" style={activeStyle}>
      <img src={`images/locations/${props.name}.png`} className="img-location"/>
      <text className="cell-text">{props.name} {props.coords}</text>
    </div>
  );
}

export default Cell;
