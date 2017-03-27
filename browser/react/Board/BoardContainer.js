import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

import { zoomIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import Row from './Row';

const animateStyles = StyleSheet.create({
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '.75s'
  }
});

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board, merchants } = this.props;

    return (
        <div className={css(animateStyles.zoomIn)} id="board-container">
            {
              board && board.grid.map((row, index) => {
                return (
                  <Row
                    key={index}
                    row={row}
                    merchants={merchants}
                  />
                );
              })
            }
        </div>
    );
  }
}

const mapStateToProps = ({ board: { board }, game: { id: gameId }, firebase }) => ({
  board: board,
  merchants: dataToJS(firebase, `games/${gameId}/merchants`)
});

export default compose(
  DragDropContext(HTML5Backend),
  firebaseConnect(({gameId}) => ([
    `games/${gameId}`,
    `games/${gameId}/merchants`
  ])),
  connect(mapStateToProps)
)(BoardContainer);
