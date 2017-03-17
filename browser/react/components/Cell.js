import React from 'react';

const Cell = props => {

  return (
    <td>
      {`${props.id}`}: Location
    </td>
  )
}

export default Cell;
