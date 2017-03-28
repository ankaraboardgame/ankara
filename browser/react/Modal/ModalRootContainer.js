import React from 'react';
import { connect } from 'react-redux';

/** -------- Default Modal Component ---- */
import Modal from './Modal';

/** -------- Location Components -------- */
import BlackMarket from '../Location/BlackMarket';
import Caravansary from '../Location/Caravansary';
import FabricWarehouse from '../Location/FabricWarehouse';
import FruitWarehouse from '../Location/FruitWarehouse';
import GemstoneDealer from '../Location/GemstoneDealer';
import GreatMosque from '../Location/GreatMosque';
import LargeMarket from '../Location/LargeMarket';
import SmallMarket from '../Location/SmallMarket';
import SmallMosque from '../Location/SmallMosque';
import SpiceWarehouse from '../Location/SpiceWarehouse';
import TeaHouse from '../Location/TeaHouse';
import Wainwright from '../Location/Wainwright';

/** ------- Turn Dialog Components -------- */
import DropAssistant from '../TurnDialogs/DropAssistant';
import PickUpAssistant from '../TurnDialogs/PickUpAssistant';
import MerchantEncounter from '../TurnDialogs/MerchantEncounter';
import SmugglerEncounter from '../TurnDialogs/SmugglerEncounter';

/** -------- Modal Type Constants -------- */
import {
  BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER,
  GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE,
  WAINWRIGHT
} from './location_types';

/** -------- Turn Dialog Constants ------- */
import { DROP_ASSISTANT, PICK_UP_ASSISTANT, MERCHANT_ENCOUNTER, SMUGGLER_ENCOUNTER } from './turn_types';

/** -------- Action-creators -------- */
import { loadModal, hideModal } from '../../redux/action-creators/modals';

/** -------- End Turn Route -------- */
import { endTurn } from '../../routes/move';

/** -------- Selectors -------- */
import { getUserId, getUserMoney, getUserAbilities, getUserWheelbarrow } from '../../redux/reducers/user-reducer';
import {
  getGameId, getGameData, getGameMerchants, getCaravansaryData, getGemstoneDealerData,
  getGreatMosqueData, getSmallMosqueData, getLargeMarketData, getSmallMarketData
} from '../../redux/reducers/game-reducer';
import { getModalType, getModalPayload, getModalDialog, getModalCurrentPosition } from '../../redux/reducers/modal-reducer';

const Location_Components = {
  BLACK_MARKET: BlackMarket,
  CARAVANSARY: Caravansary,
  FABRIC_WAREHOUSE: FabricWarehouse,
  FRUIT_WAREHOUSE: FruitWarehouse,
  GEMSTONE_DEALER: GemstoneDealer,
  GREAT_MOSQUE: GreatMosque,
  LARGE_MARKET: LargeMarket,
  SMALL_MARKET: SmallMarket,
  SMALL_MOSQUE: SmallMosque,
  SPICE_WAREHOUSE: SpiceWarehouse,
  TEA_HOUSE: TeaHouse,
  WAINWRIGHT: Wainwright
};

const Turn_Dialog_Components = {
  DROP_ASSISTANT: DropAssistant,
  PICK_UP_ASSISTANT: PickUpAssistant,
  MERCHANT_ENCOUNTER: MerchantEncounter,
  SMUGGLER_ENCOUNTER: SmugglerEncounter
};

/** -------- Rendering Component -------- */
class ModalRootContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleEndTurn() {
    const { gameId, userId, closeModal } = this.props;
    closeModal();
    endTurn(gameId, userId)
      .catch(console.error);
  }
  
  render() {
    const { 
      userId, userMoney, gameId, modalType, payload,
      dialog, openModal, closeModal, gemstoneData, 
      abilities, greatMosqueData, smallMosqueData, 
      userWheelbarrow, largeMarketData, smallMarketData,
      caravansaryData
    } = this.props;

    const SpecificLocation = Location_Components[modalType];
    const onClose = payload && payload.zoom ? closeModal : null;
    if (!modalType) {
      return null;
    } else {
      return (
        <Modal onClose={onClose}>
          <div id="location-modal-container">
            <SpecificLocation
              playerId={userId}
              gameId={gameId}
              dialog={dialog}
              handleEndTurn={this.handleEndTurn}
              gemstoneData={gemstoneData}
              userMoney={userMoney}
              userWheelbarrow={userWheelbarrow}
              abilities={abilities}
              caravansaryData={caravansaryData}
              greatMosqueData={greatMosqueData}
              smallMosqueData={smallMosqueData}
              largeMarketData={largeMarketData}
              smallMarketData={smallMarketData}
              openModal={openModal}
              closeModal={closeModal}
            />
            { payload && Turn_Dialog_Components[dialog] ? this.renderSpecificTurnDialog() : null }
          </div>
        </Modal>
      );
    }    
  }

  renderSpecificTurnDialog() {
    const { userId, userMoney, gameId, merchants, dialog, payload, currentPosition, openModal, closeModal } = this.props;
    const SpecificTurnDialog = Turn_Dialog_Components[dialog];
    return (
      <SpecificTurnDialog
        openModal={openModal}
        closeModal={closeModal}
        playerId={userId}
        gameId={gameId}
        payload={payload}
        currentPosition={currentPosition}
        handleEndTurn={this.handleEndTurn}
        merchants={merchants}
        userMoney={userMoney}
      />
    );
  }
  
};

/** -------- Container ---------- */
const mapStateToProps = state => ({
  userId: getUserId(state),
  userMoney: getUserMoney(state),
  userWheelbarrow: getUserWheelbarrow(state),
  gameId: getGameId(state),
  gameData: getGameData(state),
  merchants: getGameMerchants(state),
  modalType: getModalType(state),
  payload: getModalPayload(state),
  dialog: getModalDialog(state),
  abilities: getUserAbilities(state),
  caravansaryData: getCaravansaryData(state),
  gemstoneData: getGemstoneDealerData(state),
  greatMosqueData: getGreatMosqueData(state),
  smallMosqueData: getSmallMosqueData(state),
  currentPosition: getModalCurrentPosition(state),
  largeMarketData: getLargeMarketData(state),
  smallMarketData: getSmallMarketData(state)
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload)),
  closeModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRootContainer);
