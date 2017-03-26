/** --------- Action-creators -------- */
import { SET_USER } from '../action-creators/user';

/** --------- Initial state -------- */
const initialState = {
  user: null,
};

/** --------- User reducer -------- */
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
