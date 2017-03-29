import { fbDB, fbAuth } from '../../firebase';

import { settingGame } from './game';

/** --------- Constants -------- */
export const SET_USER = 'SET_USER';

/** --------- Action-creators -------- */
export const settingUser = user => ({
  type: SET_USER,
  user
});

/** --------- Thunk dispatchers -------- */
export const loadCurrentUser = () => {

  return (dispatch, getState) => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(settingUser(user));
        const userId = getState().user.user.uid;
        fbDB.ref('users').child(userId).child('game').once('value', function(snap) {
          const gameId = snap.val();
          dispatch(settingGame(gameId));
        })
      } else {
        fbAuth.signInAnonymously().catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('login failed', errorCode, errorMessage);
        });
      }
    })
  }
}
