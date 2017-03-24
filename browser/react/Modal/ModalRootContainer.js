import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

/** Winner Dialog Component */
import DisplayWinner from '../TurnDialogs/DisplayWinner';

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

import { BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER, GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE, WAINWRIGHT, SHOW_WINNER } from './location_types';


const MODAL_COMPONENTS = {
    SHOW_WINNER: DisplayWinner,
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

const ModalRootContainer = (props) => {
    if (!props.modalType) {
        return null;
    }

    const SpecificTurnDialog = MODAL_COMPONENTS[props.modalType];

    return <SpecificTurnDialog payload={props.payload} gamesRef={props.gamesRef} />;
};

const mapStateToProps = state => {
    return {
        userId: state.user.user.uid,
        gameId: state.game.id,
        modalType: state.modal.modalType,
        payload: state.modal.payload
    };
};

export default compose(
  firebaseConnect(({gameId}) => ([
    `games/${gameId}`,
    `games/${gameId}/merchants`
  ])),
  connect(mapStateToProps)
)(ModalRootContainer);
