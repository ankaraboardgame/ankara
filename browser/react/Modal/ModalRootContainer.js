import React from 'react';
import { connect } from 'react-redux';

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
import SmugglerEncountner from '../TurnDialogs/SmugglerEncounter';

/** -------- Modal Type Constants -------- */
import { BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER, GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE, WAINWRIGHT } from './location_types';

/** -------- Turn Dialog Constants ------- */
import { DROP_ASSISTANT, PICK_UP_ASSISTANT, MERCHANT_ENCOUNTER, SMUGGLER_ENCOUNTER } from './turn_types';

/** -------- Selectors -------- */
import { getUserId } from '../../redux/reducers/user-reducer';
import { getGameId, getGameData, getGameMerchants } from '../../redux/reducers/game-reducer';
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

/** -------- Container -------- */
const ModalRootContainer = ({ userId, gameId, gameData, merchants, modalType, payload, dialog, currentPosition }) => {
  if (!modalType) {
    return null;
  }

  const SpecificLocation = Location_Components[modalType];
  const SpecificTurnDialog = Turn_Dialog_Components[dialog]

  return <SpecificLocation payload={payload} gameData={gameData} />;
};

const mapStateToProps = state => ({
  userId: getUserId(state),
  gameId: getGameId(state),
  gameData: getGameData(state),
  merchants: getGameMerchants(state),
  modalType: getModalType(state),
  payload: getModalPayload(state),
  dialog: getModalDialog(state),
  currentPosition: getModalCurrentPosition(state)
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps)(ModalRootContainer);
