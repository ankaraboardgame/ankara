import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { actionPayMerchants } from '../../routes/encounter';
import { mapCoordToLocation } from '../../utils/board';

import { ACTION } from '../Modal/turn_types';

class MerchantEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.handleMerchant = this.handleMerchant.bind(this);
  }
  

  handleMerchant() {
    const { gameId, playerId, currentPosition, payload, openModal, closeModal } = this.props;
    const { otherMerchants } = payload;

    actionPayMerchants(gameId, playerId, otherMerchants)
    .then(() => {
      closeModal();
      openModal(
        mapCoordToLocation(currentPosition),
        {
          currentPosition: currentPosition,
          dialog: ACTION // sends to renderAction()
        }
      );
    })
  }

  render() {
    const { handleEndTurn, payload } = this.props;
    return (
      <div id="turn-dialog-half">
        <RaisedButton
          label={`Pay other merchants ${payload.merchantCount * 2} lira`}
          style={{ margin: 12 }}
          primary={true}
          onTouchTap={this.handleMerchant}
          disabled={payload.money < 2}
        />
        <RaisedButton
          label="End turn now"
          style={{ margin: 12 }}
          secondary={true}
          onTouchTap={handleEndTurn}
        />
      </div>
    );
  }
};

export default MerchantEncounter;
