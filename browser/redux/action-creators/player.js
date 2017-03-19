/********* CONSTANTS ********/
export const SWITCH_PLAYER_ACTIVE = 'SWITCH_PLAYER_ACTIVE';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';

/******* ACTION CREATORS ********/
export const switchActive = bool => ({
  type: SWITCH_PLAYER_ACTIVE,
  active: bool
});

export const settingPlayers = players => ({
  type: SET_PLAYERS,
  players
});

const settingPlayerPosition = (id, coords, possibleMoves) => ({
  type: SET_PLAYER_POSITION,
  player: id,
  position: coords,
  possibleMoves
});

/** -------- THUNK-DISPATCHERS --------- */

export const setPlayerPosition = (id, coords, possibleMoves) => {
  return dispatch => {
    dispatch(settingPlayerPosition(id, coords, possibleMoves));
  }
};
