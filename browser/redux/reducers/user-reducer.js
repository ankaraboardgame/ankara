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
}

/** -------- Selectors --------- */

export const getUserId = state => {
  return state.user.user && state.user.user.uid;
};

export const getUsername = state => {
  const userId = getUserId(state);
  const gameId = getGameId(state);
  return userId && gameId && dataToJS(state.firebase, `games/${gameId}/playerMap/${userId}`);
};

export const getUserData = state => {
  const userId = getUserId(state);
  const gameId = getGameId(state);
  return userId && gameId && dataToJS(state.firebase, `games/${gameId}/merchants/${userId}`);
};

export const getUserNumber = state => {
  const userData = getUserData(state);
  return userData && userData.number;
};

export const getUserWheelbarrow = state => {
  const userData = getUserData(state);
  return userData && userData.wheelbarrow;
};

export const getUserBonusCards = state => {
  const userData = getUserData(state);
  return userData && userData.bonusCards;
};

export const getUserAbilities = state => {
  const userData = getUserData(state);
  return userData && userData.abilities;
};

export const getUserMoney = state => {
  const userWheelbarrow = getUserWheelbarrow(state);
  return userWheelbarrow && userWheelbarrow.money;
};

export const getUserPosition = state => {
  const userData = getUserData(state);
  return userData && userData.position;
};

export const getUserAssistants = state => {
  const userData = getUserData(state);
  return userData && userData.assistants;
};
