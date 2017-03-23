import React from 'react';

const PlayerInfo = (props) => {
  const playerId = props.playerId;
  const gamesRef = props.gamesRef;
  const playerNum = props.gamesRef.merchants[playerId].number
  return(
    <div  id="playerInfo">
      {
        playerNum === 0 ? <div><img src="images/player/redplayer.png" id="player-icon" />{gamesRef.playerMap[playerId]}</div> :
        playerNum === 1 ? <div><img src="images/player/blueplayer.png" id="player-icon" />{gamesRef.playerMap[playerId]}</div> :
        playerNum === 2 ? <div><img src="images/player/greenplayer.png" id="player-icon" />{gamesRef.playerMap[playerId]}</div> :
        playerNum === 3 ? <div><img src="images/player/yellowplayer.png" id="player-icon" />{gamesRef.playerMap[playerId]}</div> : null
      }
    </div>
  )
}

export default PlayerInfo
