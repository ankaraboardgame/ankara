import React from 'react';

const Cell = props => {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <img src={`images/locations/${props.name}.png`} className="img-location"/>
      <text className="cell-text">{props.coords}</text>
    </div>
  );
}

export default Cell;
