import React from 'react';
import { DragSource } from 'react-dnd';

/** ------ Presentational Component ------- */
const Player = ({ connectDragSource, isDragging, playerNum }) => {

  const images = [
    'images/player/redplayer.png',
    'images/player/blueplayer.png',
    'images/player/greenplayer.png',
    'images/player/yellowplayer.png'
  ];

  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move'
    }}>
      <img src={images[playerNum]} className="player-icon" />
    </div>
  );
}

/** ------- React-DnD Higher Order Component ------- */
const playerSource = {
  beginDrag(props) {
    return {};
  },
  canDrag({ currentUser, playerId, activePlayer }) {
    return currentUser === playerId && currentUser === activePlayer
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('player', playerSource, collect)(Player);
