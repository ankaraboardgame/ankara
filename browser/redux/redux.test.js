import { createStore, combineReducers } from 'redux';
import chai, { expect } from 'chai';

/** Action-creators */
import { settingGame } from './action-creators/game';
import { loadModal, hideModal } from './action-creators/modals';

/** Reducers */
import gameReducer from './reducers/game-reducer';
import modalReducer from './reducers/modal-reducer';

describe('Redux architecture', () => {

  describe('action creators', () => {

    describe('settingGame', () => {

      it('returns expected action description', () => {

        const gameId = '1337';

        const actionDescriptor = settingGame(gameId);

        expect(actionDescriptor).to.be.deep.equal({
            type: 'SETTING_GAME',
            id: gameId
        });

      });

    });

    describe('loadModal', () => {

      it('returns expected action description', () => {

        const testModalType = 'LOGIN_MODAL';
        const testPayload = { currentUser: 'Dan' };
        const actionDescriptor = loadModal(testModalType, testPayload);

        expect(actionDescriptor).to.be.deep.equal({
            type: 'SHOW_MODAL',
            modalType: testModalType,
            payload: testPayload
        });

      });

    });

    describe('hideModal', () => {

      it('returns expected action description', () => {

        const actionDescriptor = hideModal();

        expect(actionDescriptor).to.be.deep.equal({
            type: 'HIDE_MODAL'
        });

      });

    });

  });

  describe('store/reducer', () => {

    let testingStore;
    beforeEach('Create testing store from reducer', () => {
      testingStore = createStore(combineReducers({
        modal: modalReducer,
        room: roomReducer,
        game: gameReducer
      }));
    });

    describe('reducing on SETTING_GAME', () => {

      it('affects state by setting gameId to id', () => {

        testingStore.dispatch({
          type: 'SETTING_GAME',
          id: '1337'
        });

        const newState = testingStore.getState();

        expect(newState.game.id).to.be.equal('1337');

      });

      it('creates a NEW state object on any dispatched action', () => {

        const currentStoreState = testingStore.getState();

        testingStore.dispatch({
          type: 'SETTING_GAME',
          id: '1337'
        });

        const subsequentStoreState = testingStore.getState();

        expect(currentStoreState).to.not.be.equal(subsequentStoreState);

      });

    });

    describe('reducing on SHOW_MODAL', () => {

      it('affects the state by setting modalType and its payload', () => {

        const testModalType = 'LOGIN_MODAL';
        const testPayload = { currentUser: 'Dan' };

        testingStore.dispatch({
          type: 'SHOW_MODAL',
          modalType: testModalType,
          payload: testPayload
        });

        const newState = testingStore.getState();
        expect(newState.modal.modalType).to.be.equal(testModalType);
        expect(newState.modal.payload).to.be.equal(testPayload);

      });

    });

    describe('reducing on HIDE_MODAL', () => {

      beforeEach(() => {
        const testModalType = 'LOGIN_MODAL';
        const testPayload = { currentUser: 'Dan' };

        testingStore.dispatch({
          type: 'SHOW_MODAL',
          modalType: testModalType,
          payload: testPayload
        });

      });

      it('affects the state by setting modalType and its payload to null', () => {

        testingStore.dispatch({
            type: 'HIDE_MODAL'
        });

        const newState = testingStore.getState();

        expect(newState.modal.modalType).to.be.equal(null);
        expect(newState.modal.payload).to.be.equal(null);

      });

    });

  });

});
