import axios from 'axios';

import { SWITCH_PLAYER_ACTIVE } from '../action-creators/player';

/******** INITIAL STATE ********/
const initialState = {
  active: false
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {

    case SWITCH_PLAYER_ACTIVE:
      newState.active = action.active;
      break;

    default:
      return state;

  }

  return newState;
};
