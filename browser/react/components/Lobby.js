import React from 'react';
import { Link } from 'react-router';

class Lobby extends React.Component {

  render() {
    console.log('render lobby');

    return (
      <div>
        <Link to="/lobby">Play</Link>
      </div>
    )
  }
}

export default Lobby;
