/********* CONSTANTS ********/
export const SWITCH_PLAYER_ACTIVE = 'SWITCH_PLAYER_ACTIVE';

/******* ACTION CREATORS ********/
export const switchActive = bool => ({
  type: SWITCH_PLAYER_ACTIVE,
  active: bool
});
