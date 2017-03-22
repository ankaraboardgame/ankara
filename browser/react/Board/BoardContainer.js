import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase'

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
                key={index}
                row={row}
                userId={this.props.user.uid}
                games={this.props.games}
                merchants={this.props.merchants}
                openModal={this.props.openModal}
                closeModal={this.props.closeModal}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({board, positions, game, user, firebase}) => ({
  board: board.board,
  user: user.user,
  games: dataToJS(firebase, `games/${game.id}`),
  merchants: dataToJS(firebase, `games/${game.id}/merchants`),
  auth: pathToJS(firebase, 'auth')
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload)),
  closeModal: () => dispatch(hideModal())
})

export default compose(
  DragDropContext(HTML5Backend),
  firebaseConnect(({gameId}) => ([
    `games/${gameId}`,
    `games/${gameId}/merchants`
  ])),
  connect(mapStateToProps, mapDispatchToProps)
)(BoardContainer);
