/********* CONSTANTS ********/
export const SET_USER = 'SET_USER';

/******* ACTION CREATORS ********/
export const settingUser = user => ({
    type: SET_USER,
    user
});

/** -------- THUNK-DISPATCHERS --------- */
