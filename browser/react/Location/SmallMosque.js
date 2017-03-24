import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import RaisedButton from 'material-ui/RaisedButton';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyMosqueTile } from '../../routes/location';
import { endTurn } from '../../routes/move';

class SmallMosque extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyFabricTile = this.handleBuyFabricTile.bind(this);
    this.handleBuySpiceTile = this.handleBuySpiceTile.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleBuyFabricTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'smallMosque', 'fabric')
    .then(() => endTurn(this.props.gameId, this.props.playerId))
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  handleBuySpiceTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'smallMosque', 'spice')
    .then(() => endTurn(this.props.gameId, this.props.playerId))
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  handleEndTurn(){
    endTurn(this.props.gameId, this.props.playerId)
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  render() {
    const fabricRequired = this.props.gamesRef.smallMosque.fabric;
    const spiceRequired = this.props.gamesRef.smallMosque.spice;
    const playerId = this.props.playerId;
    const wheelbarrow = this.props.gamesRef.merchants[playerId].wheelbarrow;
    const abilities = this.props.gamesRef.merchants[playerId].abilities;
    const style = { margin: 12 };
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/small_mosque.png`} id="img-location" />
            <p>You can buy 1 tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />When you aquire both Small Mosque<br /> tiles, you will earn a ruby.</p>
            <div id="mosque-row">
              <div id="mosque-fabric">
                {
                  wheelbarrow.fabric >= fabricRequired && !abilities.fabric.acquired ?
                  <div>
                    <RaisedButton label="Buy Fabric Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuyFabricTile}  />
                  </div>
                  : !abilities.fabric.acquired ?
                  <div>
                    <RaisedButton label="Buy Fabric Mosque Tile" disabled={true} style={style} primary={true}  />
                  </div>
                  :
                  <div>
                    <RaisedButton label="Tile Already Acquired" disabled={true} style={style} primary={true}  />
                  </div>
                }
              </div>
              <div id="mosque-spice">
                {
                  wheelbarrow.spice >= spiceRequired && !abilities.spice.acquired ?
                  <div>
                    <RaisedButton id="spice" label="Buy Spice Mosque Tile" style={style} primary={true} onTouchTap={this.handleBuySpiceTile}  />
                  </div>
                  : !abilities.fruit.acquired ?
                  <div>
                    <RaisedButton label="Buy Spice Mosque Tile" disabled={true} style={style} primary={true}  />
                  </div>
                  :
                  <div>
                    <RaisedButton label="Already Acquired" disabled={true} style={style} primary={true}  />
                  </div>
                }
              </div>
            </div>
          <RaisedButton label="End Turn" style={style} primary={true} onTouchTap={this.handleEndTurn} />
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

const mapStateToProps = state => ({
  playerId: state.user.user.uid,
  gameId: state.game.id
});

export default connect(mapStateToProps, mapDispatchToProps)(SmallMosque);
