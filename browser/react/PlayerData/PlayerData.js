import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

import SinglePlayerComponent from './SinglePlayerComponent';
import PlayerButtons from './PlayerButtons';

class PlayerDataContainer extends Component {
  constructor(props){
    super(props)
  }

/*
Side menu:
My Wheelbarrow
My Bonus Cards
My Ability Cards
Player 2
Player 3
Player 4
Game Log
Exit Game

And render the latest game log at the bottom of the page (on the left, which player's turn, and on the right, what action is taken)
*/

  render(){
    const playerId = this.props.playerId;
    const playerIds = this.props.merchants.playerIds;
    const playerMap = this.props.merchants.playerMap;
    return (
      <div>
        <PlayerButtons />
        <SinglePlayerComponent playerId={playerId} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  gameData: dataToJS(state.firebase, `games/${state.game.id}`),
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

// const mapDispatchToProps = dispatch => ({
//   closeModal: () => dispatch(hideModal()),
//   openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
// });

export default connect(mapStateToProps, null)(PlayerDataContainer);
