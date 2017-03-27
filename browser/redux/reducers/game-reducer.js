import { dataToJS } from 'react-redux-firebase';

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

/** -------- Selectors ----------- */
export const getGameId = state => {
  if (state.game) return state.game.id;
  else return null;
};

export const getGameData = state => {
  const gameId = getGameId(state);
  if (gameId) return dataToJS(state.firebase, `games/${gameId}`);
  else return null;
};

export const getGameMerchants = state => {
  if (getGameData(state)) return getGameData(state).merchants;
  else return null;
};

export const getSmuggler = state => {
  if (getGameData(state)) return getGameData(state).smuggler;
  else return null;
};

export const getPlayerIds = state => {
  if (getGameData(state)) return getGameData(state).playerIds;
  else return null;
};

export const getPlayerTurn = state => {
  if (getGameData(state)) return getGameData(state).playerTurn;
  else return null;
};

export const getPlayerMap = state => {
  if (getGameData(state)) return getGameData(state).playerMap;
  else return null;
};

export const getLargeMarketData = state => {
  if (getGameData(state)) return getGameData(state).largeMarket;
  else return null;
};

export const getSmallMarketData = state => {
  const gameState = getGameData(state);
  return gameState && gameState.smallMarket
  // if (getGameData(state)) return getGameData(state).smallMarket;
  // else return null;
};

export const getGemstoneDealerData = state => {
  if (getGameData(state)) return getGameData(state).gemstoneDealer;
  else return null;
};

export const getLastRound = state => {
  if (getGameData(state)) return getGameData(state).lastRound;
  else return null;
};