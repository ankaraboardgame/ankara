import React from 'react';

import Cell from './Cell.js';

class Grid extends React.Component {

  render() {
    let rows = [0, 1, 2, 3];
    let columns = [0, 1, 2];

    return (
      <table>
        <tbody>
          {
            rows.map(row =>
              <tr key={row} id={`row-${row}`}>
                {
                  columns.map(column =>
                    <Cell key={column} coords={`${column},${row}`} />
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

export default Grid;
