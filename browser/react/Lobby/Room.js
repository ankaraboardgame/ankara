import React from 'react';

export const Room = props => {

  function handleJoin (){
    props.handleJoin(props.id)
  }

  function createUser (key, i) {
      return (
        <li key={ i }>
          { props.users[key] }
          <span 
            className="x-button"
            onClick={ (e) => {
              e.preventDefault();
              props.handleRemove(props.roomId, name)
            } }>
            X
          </span>
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
          placeholder="Enter nickname." />
        <input type="submit" value="Join table" />
      </form>
    </div>
  )
}
