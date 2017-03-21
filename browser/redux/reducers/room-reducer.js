// import axios from 'axios';
// import { merge } from 'lodash';

import { SET_JOINED_TRUE, SET_JOINED_FALSE } from '../action-creators/room';

/******** INITIAL STATE ********/
const initialState = {
  joined: false
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_JOINED_TRUE:
      newState.joined = true;
      break;
    case SET_JOINED_FALSE:
      newState.joined = false;
      break;
    default:
      return state;
  }

  return newState;
}
