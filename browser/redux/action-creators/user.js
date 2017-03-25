import { fbDB, fbAuth, googleProvider } from '../../firebase';

import { settingGame } from './game';

/********* CONSTANTS ********/
export const SET_USER = 'SET_USER';

/******* ACTION CREATORS ********/
export const settingUser = user => ({
    type: SET_USER,
    user
});

/** -------- THUNK-DISPATCHERS --------- */

export const loadCurrentUser = () => {

    return (dispatch, getState) => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(settingUser(user));
                    const userId = getState().user.user.uid;
                    fbDB.ref('users').child(userId).once('value', (snap) => {
                        return snap;
                    }).then(snapshot => {
                        const gameId = snapshot.val();
                        dispatch(settingGame(gameId));
                    })
            } else {
                fbAuth.signInAnonymously().catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error('login failed', errorCode, errorMessage);
                });
            }
        })
    }
}
