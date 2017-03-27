import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyRuby } from '../../routes/location';
import { endTurn } from '../../routes/move';

import { whichDialog, handleEndTurn, beforeEndTurn } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';
import { canTalkToSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from '../../utils/smuggler';
import { handleMoreOptionsClick, handleGoBackClick, handleBonusFiveLiraClick, handleBonusOneGoodClick, handleBonusGood } from '../../utils/MoreOptions';

/****************** Component ********************/
class GemstoneDealer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gemPrice: null,
      smuggler: {
        goodWanted: null,
        trade: null
      }
    };

    this.handleBuyGem = this.handleBuyGem.bind(this);
    this.handleEndTurn = handleEndTurn.bind(this);
    this.whichDialog = whichDialog.bind(this);
    this.handleAssistant = handleAssistant.bind(this);
    this.handleMerchant = handleMerchant.bind(this);
    this.beforeEndTurn = beforeEndTurn.bind(this);

    /** smuggler functions */
    this.canTalkToSmuggler = canTalkToSmuggler.bind(this);
    this.handleSmuggler = handleSmuggler.bind(this);
    this.talkToSmuggler = talkToSmuggler.bind(this);
    this.handleSmugglerGoodClick = handleSmugglerGoodClick.bind(this);
    this.handleSmugglerPayClick = handleSmugglerPayClick.bind(this);

    /** access more options */
    this.handleMoreOptionsClick = handleMoreOptionsClick.bind(this);
    this.handleGoBackClick = handleGoBackClick.bind(this);
    this.handleBonusFiveLiraClick = handleBonusFiveLiraClick.bind(this);
    this.handleBonusOneGoodClick = handleBonusOneGoodClick.bind(this);
    this.handleBonusGood = handleBonusGood.bind(this);
  }

  componentDidMount (){
    this.setState({ gemPrice: +this.props.gameData.gemstoneDealer });
  }

  handleBuyGem(){
    actionBuyRuby(this.props.gameId, this.props.playerId)
      .then(this.beforeEndTurn)
      .catch(console.error);

  }

  render() {
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;
    const price = this.state.gemPrice;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/gemstone_dealer.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const style = { margin: 12 };
    const price = this.state.gemPrice;
    const money = this.props.gameData.merchants[this.props.playerId].wheelbarrow.money

    return (
      <div id="turn-dialog-half">
        <div id="text-box">
          <p>All the gems that money can buy. Current price: {price} lira.</p>
        </div>
          <div>
            <RaisedButton
              label={`BUY GEM FOR ${price} LIRA`}
              style={{ margin: 12 }}
              primary={true}
              onTouchTap={this.handleBuyGem}
              disabled={money < price}
            />
          <RaisedButton label="No thanks, I'll end my turn" style={style} primary={true} onTouchTap={this.beforeEndTurn} />
            <RaisedButton label="More Options" style={style} onTouchTap={() => this.handleMoreOptionsClick('action')} />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  gameData: dataToJS(state.firebase, `games/${state.game.id}`),
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GemstoneDealer);
