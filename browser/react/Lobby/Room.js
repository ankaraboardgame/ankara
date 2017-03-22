import React from 'react';

export const Room = props => {

  function handleJoin (){
    props.handleJoin(props.id)
  }

  function createUser (key, i) {
      return (
        <li key={ key }>
          { props.users[key] }
        </li>
      );
    }

  return (
    <div className="room">
      <h2>{ props.roomName }</h2>
      {
        props.users &&
        <ul>{ Object.keys(props.users).map(createUser) }</ul>
      }
      <form onSubmit={(evt) => {props.handleJoin(evt, props.roomId, props.userId)}}>
        <input
          type="text"
          name="userdisplayname"
          disabled={props.joined}
          placeholder="Enter nickname."
        />
        <input type="submit" value="Join table" />
      </form>
    </div>
  )
}
