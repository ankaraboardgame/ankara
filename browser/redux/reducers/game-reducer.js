/** --------- Action-creators -------- */
import { SETTING_GAME, SETTING_WINNER } from '../action-creators/game';

/** --------- Initial state -------- */
const initialState = {
  id: null,
};

/** --------- Game reducer -------- */
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
