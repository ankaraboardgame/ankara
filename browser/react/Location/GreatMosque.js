import React from 'react';
import { connect } from 'react-redux';
import { dataToJS } from 'react-redux-firebase';

import Modal from '../Modal/Modal';
import RaisedButton from 'material-ui/RaisedButton';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyMosqueTile } from '../../routes/location';
import { endTurn } from '../../routes/move';

import { whichDialog, handleEndTurn, beforeEndTurn } from '../../utils';
import { handleMerchant } from '../../utils/otherMerchants.js';
import { handleAssistant } from '../../utils/assistants.js';
import { canTalkToSmuggler, handleSmuggler, talkToSmuggler, handleSmugglerGoodClick, handleSmugglerPayClick } from '../../utils/smuggler';
import { handleMoreOptionsClick, handleGoBackClick, handleBonusFiveLiraClick, handleBonusOneGoodClick, handleBonusGood } from '../../utils/MoreOptions';

/****************** Component ********************/
class GreatMosque extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smuggler: {
        goodWanted: null,
        trade: null
      }
    };

    this.handleBuyHeirloomTile = this.handleBuyHeirloomTile.bind(this);
    this.handleBuyFruitTile = this.handleBuyFruitTile.bind(this);
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

  handleBuyHeirloomTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'greatMosque', 'heirloom')
    .then(this.beforeEndTurn)
    .catch(console.error)
  }

  handleBuyFruitTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'greatMosque', 'fruit')
    .then(this.beforeEndTurn)
    .catch(console.error)
  }

  // Ends Turn
  handleEndTurn() {
    endTurn(this.props.gameId, this.props.playerId)
      .then(() => this.props.closeModal())
      .catch(console.error);
  }

  render() {
    const onClose = this.props.payload.zoom ? this.props.closeModal : null;

    return (
      <Modal onClose={onClose}>
        <div id="location-modal-container">
          <img src={`images/locations/great_mosque.jpg`} id="img-location" />
          { this.whichDialog(this.props.payload) }
        </div>
      </Modal>
    );
  }

  renderAction() {
    const heirloomRequired = this.props.gamesRef.greatMosque.heirloom;
    const fruitRequired = this.props.gamesRef.greatMosque.fruit;
    const playerId = this.props.playerId;
    const wheelbarrow = this.props.gamesRef.merchants[playerId].wheelbarrow;
    const abilities = this.props.gamesRef.merchants[playerId].abilities;
    const style = { margin: 12 };

    return (
      <div id="turn-dialog-full">
        <div id="text-box">
          <p>You can buy a tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />Earn a ruby when you have acquired both tiles.</p>
        </div>
          <div id="mosque-row">
            <div id="mosque-heirloom">
              {
                wheelbarrow.heirloom >= heirloomRequired && !abilities.heirloom.acquired ?
                <div>
                  <RaisedButton label="Buy Heirloom Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyHeirloomTile}  />
                </div>
                : !abilities.heirloom.acquired ?
                <div>
                  <RaisedButton label="Buy Heirloom Mosque Tile" disabled={true} style={style} primary={true}  />
                </div>
                :
                <div>
                  <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true} />
                </div>
              }
            </div>
            <div id="mosque-fruit">
              {
                wheelbarrow.fruit >= fruitRequired && !abilities.fruit.acquired ?
                <div>
                  <RaisedButton label="Buy Fruit Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyFruitTile} />
                </div>
                : !abilities.fruit.acquired ?
                <div>
                  <RaisedButton label="Buy Fruit Mosque Tile" disabled={true} style={style} primary={true} />
                </div>
                :
                <div>
                  <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true} />
                </div>
              }
            </div>
          </div>
        <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn} />
        <RaisedButton label="More Options" style={style} onTouchTap={() => this.handleMoreOptionsClick('action')} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  payload: state.modal.payload,
  currentPosition: state.modal.payload.currentPosition,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GreatMosque);
