import React from 'react';

export const CreateRoomButton = props => {
  return (
    <div id="create-room-button">
      <form onSubmit={ props.handleSubmit }>
        <input type="text" name="roomname" />
        <input type="submit" value="Create Room" />
      </form>
    </div>
  )
}
