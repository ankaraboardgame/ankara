import React from 'react';
import { connect } from 'react-redux';

/** Location Components */
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


/** Modal Type Constants */

import { BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER, GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE, WAINWRIGHT } from './location_types';


const MODAL_COMPONENTS = {
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

const ModalRootContainer = ({ modalType, payload, gameData }) => {
  if (!modalType) {
    return null;
  }

  const SpecificTurnDialog = MODAL_COMPONENTS[modalType];

  return <SpecificTurnDialog payload={payload} gameData={gameData} />;
};

const mapStateToProps = ({ modal: { modalType, payload } }, { gameData }) => {
  return {
    gameData: gameData,
    modalType: modalType,
    payload: payload
  };
};

export default connect(mapStateToProps)(ModalRootContainer);
