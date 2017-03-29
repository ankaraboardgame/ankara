import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { actionPayMerchants } from '../../routes/encounter';
import { mapCoordToLocation } from '../../utils/board';

/** ------- Constants -------- */
import { ACTION } from '../Modal/turn_types';

class MerchantEncounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { actionTaken: false };

    this.handleMerchant = this.handleMerchant.bind(this);
  }


  handleMerchant() {
    this.setState({ actionTaken: true });
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
        <div id="market-row">
          <RaisedButton
            label={`Pay other merchants ${payload.merchantCount * 2} lira`}
            style={{ margin: 12 }}
            primary={true}
            onTouchTap={this.handleMerchant}
            disabled={payload.money < 2 || this.state.actionTaken}
            />
          <RaisedButton
            label="End turn now"
            style={{ margin: 12 }}
            secondary={true}
            onTouchTap={handleEndTurn}
            />
        </div>
      </div>
    );
  }
};

export default MerchantEncounter;
