import { dataToJS } from 'react-redux-firebase';
import { getGameId } from './game-reducer';

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

/** -------- Selectors --------- */

export const getUserId = state => {
  if (state.user.user) return state.user.user.uid;
  else return null;
};

export const getUsername = state => {
  const userId = getUserId(state);
  const gameId = getGameId(state);
  return dataToJS(state.firebase, `games/${gameId}/playerMap/${userId}`);
};

export const getUserNumber = state => {
  return getUserData(state).number;
};

export const getUserData = state => {
  const userId = getUserId(state);
  const gameId = getGameId(state);
  return dataToJS(state.firebase, `games/${gameId}/merchants/${userId}`);
};

export const getUserWheelbarrow = state => {
  return getUserData(state).wheelbarrow;
};

export const getUserPosition = state => {
  return getUserData(state).position;
};

export const getUserAssistants = state => {
  return getUserData(state).assistants;
};
