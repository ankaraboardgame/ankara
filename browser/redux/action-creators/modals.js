/** --------- Constants -------- */
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

/** --------- Action-creators -------- */
export const loadModal = (modalType, payload) => {
  return {
    type: SHOW_MODAL,
    modalType: modalType,
    payload: payload
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};
