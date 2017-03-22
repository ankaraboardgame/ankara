import React from 'react';

export const Room = props => {

  function handleJoin (){
    props.handleJoin(props.id)
  }

  function createUser (key, index) {
      return (
        <li key={ index }>
          { key }
          <span 
            className="x-button"
            onClick={ (e) => {
              e.preventDefault();
              props.handleRemove(props.id, key)
            } }>
            X
          </span>
        </li>
      );
    }

  return (
    <div className="room">
      <h2>{ props.id }</h2>
      <ul>{ Object.keys(props.users).map(createUser) }</ul>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.handleJoin(props.id, props.users)
        }}
        disabled={props.joined}>
      Join this room
      </button>
    </div>
  )
}
