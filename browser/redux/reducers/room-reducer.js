import { dataToJS } from 'react-redux-firebase';

/** -------- Selectors --------- */

export const getRoomData = state => {
  return dataToJS(state.firebase, 'rooms');
};
