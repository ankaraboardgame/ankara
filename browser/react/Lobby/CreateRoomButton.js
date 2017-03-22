import React from 'react';

export const CreateRoomButton = props => {
  return (
    <div id="create-room-button">
      <button onClick={ props.handleClick }>
        CREATE ROOM
      </button>
    </div>
  )
}
