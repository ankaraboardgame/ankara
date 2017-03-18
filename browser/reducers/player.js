import axios from 'axios';

/********* CONSTANTS ********/
const SWITCH_PLAYER_ACTIVE = 'MAKE_PLAYER_ACTIVE';

/******** INITIAL STATE ********/
const initialState = {
  active: false
}

/********** REDUCER  **********/
export default reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SWITCH_PLAYER_ACTIVE:
      newState.active = action.active;
      break;
    default:
      return state;
  }

  return newState;
}

/******* ACTION CREATORS ********/
export const switchActive = bool => ({
  type: SWITCH_PLAYER_ACTIVE,
  active: bool
});
