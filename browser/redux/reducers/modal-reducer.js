/** --------- Action-creators -------- */
import { SHOW_MODAL, HIDE_MODAL } from '../action-creators/modals';

/** --------- Initial state -------- */
const initialModalState = {
  modalType: null,
  payload: null
};

/** --------- Modal Reducer -------- */
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

export const getModalType = state => (state.modal.modalType);

export const getModalPayload = state => (state.modal.payload);

export const getModalCurrentPosition = state => {
  if (state.modal.payload && state.modal.payload.currentPosition) return state.modal.payload.currentPosition;
  else return null;
};

export const getModalDialog = state => {
  if (state.modal.payload && state.modal.payload.dialog) return state.modal.payload.dialog;
  else return null;
};

export const getNextModalDialog = state => {
  if (state.modal.payload && state.modal.payload.nextDialog) return state.modal.payload.nextDialog;
  else return null;
};
