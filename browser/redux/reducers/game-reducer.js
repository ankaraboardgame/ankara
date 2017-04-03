import { dataToJS } from 'react-redux-firebase';

/** --------- Action-creators -------- */
import { SETTING_GAME, SETTING_WINNER, REMOVING_GAME } from '../action-creators/game';

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

    case REMOVING_GAME:
      newState.id = null;
      break;

    default:
      return state;
  }

  return newState;
}

/** -------- Selectors ----------- */
export const getGameId = state => {
  return state.game && state.game.id;
};

export const getGameData = state => {
  const gameId = getGameId(state);
  return gameId && dataToJS(state.firebase, `games/${gameId}`);
};

export const getGameChats = state => {
  const gameData = getGameData(state);
  const chats = [];
  if (gameData) {
    for (let chatId in gameData.chats){
      chats.push(gameData.chats[chatId]);
    }
  }
  return chats;
};

export const getGameMerchants = state => {
  const gameData = getGameData(state);
  return gameData && gameData.merchants;
};

export const getSmuggler = state => {
  const gameData = getGameData(state);
  return gameData && gameData.smuggler;
};

export const getPlayerIds = state => {
  const gameData = getGameData(state);
  return gameData && gameData.playerIds;
};

export const getPlayerTurn = state => {
  const gameData = getGameData(state);
  return gameData && gameData.playerTurn;
};

export const getPlayerMap = state => {
  const gameData = getGameData(state);
  return gameData && gameData.playerMap;
};

export const getLargeMarketData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.largeMarket;
};

export const getSmallMarketData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.smallMarket;
};

export const getGemstoneDealerData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.gemstoneDealer;
};

export const getCaravansaryData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.caravansary;
};

export const getGreatMosqueData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.greatMosque;
};

export const getSmallMosqueData = state => {
  const gameData = getGameData(state);
  return gameData && gameData.smallMosque;
};

export const getLastRound = state => {
  const gameData = getGameData(state);
  return gameData && gameData.lastRound;
};

export const getLargeMarketTile = state => {
  const largeMarketData = getLargeMarketData(state);
  const currentLargeMarketIdx = largeMarketData.currentMarketIdx;
  return largeMarketData && largeMarketData.demandTiles[currentLargeMarketIdx];
};

export const getSmallMarketTile = state => {
  const smallMarketData = getSmallMarketData(state);
  const currentSmallMarketIdx = smallMarketData.currentMarketIdx;
  return  smallMarketData && smallMarketData.demandTiles[currentSmallMarketIdx];
};

/** Game Log */
export const getGameLogData = state => {
  const gameId = getGameId(state);
  return gameId && dataToJS(state.firebase, `gameLog/${gameId}`);
};
