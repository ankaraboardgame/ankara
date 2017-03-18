import React from 'react';
import { connect } from 'react-redux';

import Row from '../components/Row';

export class BoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPossibleMoves: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  
  handleClick(evt) {
        // highlight the cell one color, and highlight all possible moves another color OR should it show a closer/zoomed in viw of the location?
  }

  handleMouseOver(possibleMoves) {
    this.setState({currentPossibleMoves: possibleMoves});
  }

  render() {
    return (
      <div id="board-container">
        { 
          this.props.board && this.props.board.grid.map((row, index) => {
            return (
              <Row
                key={index}
                row={row}
                moves={this.state.currentPossibleMoves}
                handleMouseOver={this.handleMouseOver}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ board: state.board.board });

export default connect(mapStateToProps)(BoardContainer);
