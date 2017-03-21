import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

/** Modal Components */
import BlackMarket from './BlackMarket';
import Caravansary from './Caravansary';
import FabricWarehouse from './FabricWarehouse';
import FruitWarehouse from './FruitWarehouse';
import GemstoneDealer from './GemstoneDealer';
import GreatMosque from './GreatMosque';
import LargeMarket from './LargeMarket';
import SmallMarket from './SmallMarket';
import SmallMosque from './SmallMosque';
import SpiceWarehouse from './SpiceWarehouse';
import TeaHouse from './TeaHouse';
import Wainwright from './Wainwright';

const MODAL_COMPONENTS = {
    "0,0": GreatMosque,
    "1,0": FruitWarehouse,
    "2,0": Caravansary,
    "3,0": LargeMarket,
    "0,1": FabricWarehouse,
    "1,1": SpiceWarehouse,
    "2,1": SmallMarket,
    "3,1": Wainwright,
    "0,2": SmallMosque,
    "1,2": BlackMarket,
    "2,2": TeaHouse,
    "3,2": GemstoneDealer
};

const LocationModalContainer = (props) => {
    if (props.merchants) {

        const SpecificLocationModal = MODAL_COMPONENTS[props.merchants['player1'].position.coordinates];

        return <SpecificLocationModal />;
    } else {
        return null;
    }
};

const mapStateToProps = ({ firebase }) => {
    return {
        merchants: dataToJS(firebase, 'games/gameOne/merchants')
    };
};

export default compose(
  firebaseConnect(['games/gameOne', 'games/gameOne/merchants']),
  connect(mapStateToProps)
)(LocationModalContainer);