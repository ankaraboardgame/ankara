// import axios from 'axios';
// import { merge } from 'lodash';


import { SET_USER } from '../action-creators/user';

/******** INITIAL STATE ********/
const initialState = {
  user: null,
};

/********** REDUCER  **********/
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

    case SET_USER:
      newState.user = action.user;
      break;

    default:
      return state;

  }

  return newState;
};
