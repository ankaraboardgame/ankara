import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase';

import Row from './Row';

import { loadModal, hideModal } from '../../redux/action-creators/modals';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
        // highlight the cell one color, and highlight all possible moves another color OR should it show a closer/zoomed in viw of the location?
  }

  render() {
    return (
      <div id="board-container">
        {
          this.props.board && this.props.board.grid.map((row, index) => {
            return (
              <Row
                user={this.props.user}
                key={index}
                row={row}
                game={this.props.gameData}
                gameId={this.props.gameId}
                merchants={this.props.gameData.merchants}
                openModal={this.props.openModal}
                closeModal={this.props.closeModal}
                selfData={this.props.gameData.merchants[this.props.user.uid]}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({board, positions, user, firebase, game}) => ({
  board: board.board,
  gameId: game.id,
  winnerId: game.winnerId,
  user: user.user,
  gameData: dataToJS(firebase, `games/${game.id}`),
  auth: pathToJS(firebase, 'auth')
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload)),
  closeModal: () => dispatch(hideModal()),
  setWinner: (winnerId) => dispatch(setWinnerRedux(winnerId))
})

export default compose(
  DragDropContext(HTML5Backend),
  firebaseConnect(({gameId}) => ([
    `games/${gameId}`,
    `games/${gameId}/merchants`
  ])),
  connect(mapStateToProps, mapDispatchToProps)
)(BoardContainer);
