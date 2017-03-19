import axios from 'axios';
import { merge } from 'lodash';


import { SWITCH_PLAYER_ACTIVE, SET_PLAYERS, SET_PLAYER_POSITION } from '../action-creators/player';

/******** INITIAL STATE ********/
const initialState = {
  active: false,
  players: {},
  positions: {"playerOne": {position: "0,0", possibleMoves:["0,1", "0,-1", "-1,0", "1,0", "0,2", "-1,1", "1,1", "0,-2", "-1,-1", "1,-1", "-2,0", "2,0"]}}
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = merge({}, state);

  switch (action.type) {

    case SWITCH_PLAYER_ACTIVE:
      newState.active = action.active;
      break;

    case SET_PLAYERS:
      newState.players = action.players;
      break;

    case SET_PLAYER_POSITION:
      newState.positions[action.player] = {position: action.position, possibleMoves: action.possibleMoves};
      break;

    default:
      return state;

  }

  return newState;
};
