/** --------- Action-creators -------- */
import { SET_JOINED_TRUE, SET_JOINED_FALSE } from '../action-creators/room';

/** --------- Initial state -------- */
const initialState = {
  joined: false
};

/** --------- Room reducer -------- */
export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

    case SET_JOINED_TRUE:
      newState.joined = action.id;
      break;

    case SET_JOINED_FALSE:
      newState.joined = false;
      break;

    default:
      return state;

  }

  return newState;
}
