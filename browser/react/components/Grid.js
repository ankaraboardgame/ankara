import React from 'react';

import Cell from './Cell.js';

class Grid extends React.Component {

  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    // highlight the cell one color, and highlight all possible moves another color
  }

  render() {
    let rows = [0, 1, 2];
    let columns = [0, 1, 2, 3];

    return (
      <div id="board">
          {
            rows.map(row =>
              <div className="boardrow" key={row} id={`row-${row}`}>
                {
                  columns.map(column =>
                    <Cell
                      key={column}
                      coords={`${column},${row}`} />
                  )
                }
              </div>
            )
          }
      </div>
    )
  }
}

export default Grid;
