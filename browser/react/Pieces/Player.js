import React from 'react';
import { DragSource } from 'react-dnd';

const Player = props => {
  const { connectDragSource, isDragging, playerNum } = props;
  const images = [
    'images/player/redplayer.png',
    'images/player/blueplayer.png',
    'images/player/greenplayer.png',
    'images/player/yellowplayer.png'
  ];
  return connectDragSource(
    <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        color: 'black'
      }}>
      <img src={images[playerNum]} className="player-icon" />
    </div>
  );
}

const playerSource = {
  beginDrag(props) {
    return {};
  },
  canDrag(props) {
    return props.currentUser.uid === props.playerId && props.currentUser.uid === props.activePlayer
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('player', playerSource, collect)(Player);
