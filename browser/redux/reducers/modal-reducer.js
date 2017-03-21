/** Constant */
import { SHOW_MODAL, HIDE_MODAL } from '../action-creators/modals';

/** Initial State */
const initialModalState = {
    modalType: null,
    payload: null
};

/** Modal reducer */
export default function (state = initialModalState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {

        case SHOW_MODAL:
            newState.modalType = action.modalType;
            newState.payload = action.payload;
            break;

        case HIDE_MODAL:
            return initialModalState;

        default:
            return state;
    }

    return newState;
}
