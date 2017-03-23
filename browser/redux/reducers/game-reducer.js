// import { merge } from 'lodash';

import { SETTING_GAME } from '../action-creators/game';

/******** INITIAL STATE ********/
const initialState = {
  id: null
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SETTING_GAME:
      newState.id = action.id;
      break;

    default:
      return state;
  }

  return newState;
}
