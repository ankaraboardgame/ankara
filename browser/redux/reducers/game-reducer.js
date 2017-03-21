// import { merge } from 'lodash';

import { CREATE_GAME } from '../action-creators/game';

/******** INITIAL STATE ********/
const initialState = {
  id: null
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case CREATE_GAME:
      newState.id = action.id;
      break;
    default:
      return state;
  }

  return newState;
}
