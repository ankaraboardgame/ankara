import React from 'react';
import { Link } from 'react-router';

class Lobby extends React.Component {

  render() {
    return (
      <div>
        <Link to="/game">Play</Link>
      </div>
    )
  }
}

export default Lobby;
