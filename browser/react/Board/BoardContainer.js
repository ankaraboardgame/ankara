import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { zoomIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/** -------- Selectors ---------- */
import { getBoard } from '../../redux/reducers/board-reducer';

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
    const { board } = this.props;
    return (
        <div className={css(animateStyles.zoomIn)} id="board-container">
            {
              board && board.grid.map((row, index) => {
                return (
                  <Row
                    key={index}
                    row={row}
                  />
                );
              })
            }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
});

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps)
)(BoardContainer);
