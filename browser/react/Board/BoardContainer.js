import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { zoomIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import Row from './Row';

/** -------- Selectors ---------- */
import { getBoard } from '../../redux/reducers/board-reducer';
import { getGameMerchants } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';

/** ----------- Styles ----------- */

const animateStyles = StyleSheet.create({
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '.75s'
  }
});

/** -------- Container ---------- */
/**
 * Creates Board layout using Row units
*/

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.coins = new Audio('sounds/coins.wav');
    this.chimes = new Audio('sounds/chimes.mp3');
    this.dump = new Audio('sounds/dump.mp3');
  }

  /** For Audio */
  componentWillReceiveProps(nextProps) {
    if (this.props.merchants){

      const currentWheelbarrow = this.props.merchants[this.props.userId].wheelbarrow;
      const nextWheelbarrow = nextProps.merchants[nextProps.userId].wheelbarrow;

      if (nextWheelbarrow.money !== currentWheelbarrow.money) {
        this.coins.play();
      }
      if (
        (nextWheelbarrow.spice !== currentWheelbarrow.spice) || 
        (nextWheelbarrow.fruit !== currentWheelbarrow.fruit) || 
        (nextWheelbarrow.fabric !== currentWheelbarrow.fabric)
      ) {
        this.dump.play();
      }
      if (nextWheelbarrow.ruby !== currentWheelbarrow.ruby) {
        this.chimes.play();
      }
    }
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

/** ----- High Order Component ------- */

const mapStateToProps = state => ({
  board: getBoard(state),
  merchants: getGameMerchants(state),
  userId: getUserId(state)
});

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps)
)(BoardContainer);
