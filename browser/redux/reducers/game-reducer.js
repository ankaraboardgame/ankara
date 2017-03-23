// import { merge } from 'lodash';

import { SETTING_GAME, SETTING_WINNER } from '../action-creators/game';

/******** INITIAL STATE ********/
const initialState = {
  id: null,
  winnerId: null
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SETTING_GAME:
      newState.id = action.id;
      break;

    case SETTING_WINNER:
      newState.winnerId = action.winnerId;
      break;

    default:
      return state;
  }

  return newState;
}
