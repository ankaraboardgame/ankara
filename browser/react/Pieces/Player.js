import React from 'react';
import { DragSource } from 'react-dnd';

const Player = props => {
  const { connectDragSource, isDragging } = props;
  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      color: 'white'
    }}>
      <img src="images/player/redplayer.png" id="player-icon" />
    </div>
  );
}

const playerSource = {
  beginDrag(props) {
    return {};
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('player', playerSource, collect)(Player);
