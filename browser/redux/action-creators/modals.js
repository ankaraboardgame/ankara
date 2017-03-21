/** Constants */
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

/** Action-creators */
const showingModal = (modalType, payload) => {
    return {
        type: SHOW_MODAL,
        modalType: modalType,
        payload: payload
    };
};

const hidingModal = () => {
    return {
        type: HIDE_MODAL
    };
};

/** Thunk actions */
export const loadModal = (modalType, payload) => {
    return dispatch => dispatch(showingModal(modalType, payload));
};

export const hideModal = () => {
    return dispatch => dispatch(hidingModal());
};
