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
import MoreOptions from '../TurnDialogs/MoreOptions';
import SelectBonusGood from '../TurnDialogs/SelectBonusGood';
import MosqueTiles from '../TurnDialogs/MosqueTiles';
import BonusCards from '../TurnDialogs/BonusCards';

/** -------- Modal Type Constants -------- */
import {
  BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER,
  GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE,
  WAINWRIGHT
} from './location_types';

/** -------- Turn Dialog Constants ------- */
import {
  DROP_ASSISTANT, PICK_UP_ASSISTANT, MERCHANT_ENCOUNTER, SMUGGLER_ENCOUNTER,
  MORE_OPTIONS, SELECT_BONUS_GOOD, PLAY_BONUS, PLAY_MOSQUES_TILES
} from './turn_types';

/** -------- Action-creators -------- */
import { loadModal, hideModal } from '../../redux/action-creators/modals';

/** -------- End Turn Route -------- */
import { endTurn } from '../../routes/move';

/** -------- Helper Functions -------- */
import { mapCoordToLocation } from '../../utils/board';
import { handleSmuggler, smugglerOnLocation } from '../../utils/smuggler';

/** -------- Selectors -------- */
import { getUserId, getUserMoney, getUserAbilities, getUserWheelbarrow, getUserBonusCards, getUserAssistants } from '../../redux/reducers/user-reducer';
import {
  getGameId, getGameMerchants, getCaravansaryData, getGemstoneDealerData,
  getGreatMosqueData, getSmallMosqueData, getLargeMarketTile, getSmallMarketTile,
  getLargeMarketData, getSmallMarketData, getSmuggler
} from '../../redux/reducers/game-reducer';
import { getModalType, getModalPayload, getModalDialog, getModalCurrentPosition, getNextModalDialog } from '../../redux/reducers/modal-reducer';

/** -------- Modal Maps ------- */

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
  SMUGGLER_ENCOUNTER: SmugglerEncounter,
  MORE_OPTIONS: MoreOptions,
  SELECT_BONUS_GOOD: SelectBonusGood,
  PLAY_BONUS: BonusCards,
  PLAY_MOSQUES_TILES: MosqueTiles
};

/** -------- Rendering Component -------- */
class ModalRootContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleMoreOptionsClick = this.handleMoreOptionsClick.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleActionEnd = this.handleActionEnd.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
  }

  handleActionEnd() {
    // if there is no smuggler on location, ends turn immediately
    this.handleSmuggler();
  }

  handleEndTurn() {
    const { gameId, userId, closeModal } = this.props;
    closeModal();
    endTurn(gameId, userId)
      .catch(console.error);
  }

  handleMoreOptionsClick(prevDialog) {
    const { currentPosition, openModal, closeModal } = this.props;
    const nextDialog = prevDialog;
    closeModal();
    openModal(mapCoordToLocation(currentPosition), { currentPosition, nextDialog, dialog: MORE_OPTIONS });
  }

  render() {
    const {
      userId, userMoney, gameId, modalType, payload,
      dialog, gemstoneData, userAbilities, greatMosqueData,
      smallMosqueData, userWheelbarrow, largeMarketData,
      smallMarketData, largeMarketTile, smallMarketTile,
      caravansaryData, closeModal, smuggler
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
              // identification numbers
              playerId={userId}
              gameId={gameId}
              // modal data
              dialog={dialog}
              // user-related game data
              userMoney={userMoney}
              abilities={userAbilities}
              userWheelbarrow={userWheelbarrow}
              // game location data
              gemstoneData={gemstoneData}
              caravansaryData={caravansaryData}
              greatMosqueData={greatMosqueData}
              smallMosqueData={smallMosqueData}
              largeMarketData={largeMarketData}
              smallMarketData={smallMarketData}
              largeMarketTile={largeMarketTile}
              smallMarketTile={smallMarketTile}
              smuggler={smuggler}
              // handler functions
              handleMoreOptionsClick={this.handleMoreOptionsClick}
              handleEndTurn={this.handleEndTurn}
              handleActionEnd={this.handleActionEnd}
            />
            {
              payload && Turn_Dialog_Components[dialog] ?
                this.renderSpecificTurnDialog() : null
            }
          </div>
        </Modal>
      );
    }
  }

  renderSpecificTurnDialog() {
    const {
      userId, userMoney, userBonusCards, userAbilities, greatMosqueData,
      smallMosqueData, gameId, merchants, dialog, payload, currentPosition,
      openModal, closeModal, nextDialog, userWheelbarrow, userAssistants
    } = this.props;
    const SpecificTurnDialog = Turn_Dialog_Components[dialog];

    return (
      <SpecificTurnDialog
        // identification numbers
        playerId={userId}
        gameId={gameId}
        // modal data
        payload={payload}
        nextDialog={nextDialog}
        currentPosition={currentPosition}
        // modal dispatchers
        openModal={openModal}
        closeModal={closeModal}
        // user-related game data
        userMoney={userMoney}
        userAssistants={userAssistants}
        userAbilities={userAbilities}
        userBonusCards={userBonusCards}
        userWheelbarrow={userWheelbarrow}
        // game location data
        merchants={merchants}
        greatMosqueData={greatMosqueData}
        smallMosqueData={smallMosqueData}
        // handler functions
        handleEndTurn={this.handleEndTurn}
      />
    );
  }
}

/** -------- Container ---------- */
const mapStateToProps = state => ({
  // user store selectors
  userId: getUserId(state),
  userMoney: getUserMoney(state),
  userAssistants: getUserAssistants(state),
  userAbilities: getUserAbilities(state),
  userWheelbarrow: getUserWheelbarrow(state),
  userBonusCards: getUserBonusCards(state),
  // modal store selectors
  modalType: getModalType(state),
  payload: getModalPayload(state),
  dialog: getModalDialog(state),
  currentPosition: getModalCurrentPosition(state),
  nextDialog: getNextModalDialog(state),
  // game store selectors
  gameId: getGameId(state),
  merchants: getGameMerchants(state),
  gemstoneData: getGemstoneDealerData(state),
  caravansaryData: getCaravansaryData(state),
  greatMosqueData: getGreatMosqueData(state),
  smallMosqueData: getSmallMosqueData(state),
  largeMarketData: getLargeMarketData(state),
  smallMarketData: getSmallMarketData(state),
  largeMarketTile: getLargeMarketTile(state),
  smallMarketTile: getSmallMarketTile(state),
  smuggler: getSmuggler(state)
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload)),
  closeModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRootContainer);
