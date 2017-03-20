import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'


import Row from './Row';

import { setPlayerPosition } from '../../redux/action-creators/player';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.movePlayerPiece = this.movePlayerPiece.bind(this);
  }

  
  handleClick(evt) {
        // highlight the cell one color, and highlight all possible moves another color OR should it show a closer/zoomed in viw of the location?
  }

  movePlayerPiece(playerId, coords, possibleMoves) {
    this.props.settingPlayerPosition(playerId, coords, possibleMoves);
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
                players={this.props.players}
                movePlayerPiece={this.movePlayerPiece}
                positions={this.props.positions}
                games={this.props.games}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({board, positions, player, firebase}) => ({
  board: board.board,
  positions: player.positions,
  players: player.players,
  games: dataToJS(firebase, 'games')
});

const mapDispatchToProps = dispatch => ({
  settingPlayerPosition: (playerId, coords, possibleMoves) => dispatch(setPlayerPosition(playerId, coords, possibleMoves))
})

export default compose(
  DragDropContext(HTML5Backend),
  firebaseConnect(['games']),
  connect(mapStateToProps, mapDispatchToProps)
)(BoardContainer);
