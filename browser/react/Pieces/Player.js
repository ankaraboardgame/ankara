import React from 'react';
import { DragSource } from 'react-dnd';

const Player = props => {
  const { connectDragSource, isDragging, playerNum } = props;
  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      color: 'black'
    }}>
      { playerNum === 0 ? <img src="images/player/redplayer.png" id="player-icon" /> :
          playerNum === 1 ? <img src="images/player/blueplayer.png" id="player-icon" /> :
          playerNum === 2 ? <img src="images/player/greenplayer.png" id="player-icon" /> :
          playerNum === 3 ? <img src="images/player/yellowplayer.png" id="player-icon" /> : null }
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
