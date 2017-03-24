import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import RaisedButton from 'material-ui/RaisedButton';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyMosqueTile } from '../../routes/location';
import { endTurn } from '../../routes/move';

class GreatMosque extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuyHeirloomTile = this.handleBuyHeirloomTile.bind(this);
    this.handleBuyFruitTile = this.handleBuyFruitTile.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleBuyHeirloomTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'greatMosque', 'heirloom')
    .then(() => endTurn(this.props.gameId, this.props.playerId))
    .then(() => this.props.closeModal())
    .catch(console.error)
  }

  handleBuyFruitTile(){
    const playerId = this.props.playerId;
    actionBuyMosqueTile(this.props.gameId, this.props.playerId, 'greatMosque', 'fruit')
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
    const heirloomRequired = this.props.gamesRef.greatMosque.heirloom;
    const fruitRequired = this.props.gamesRef.greatMosque.fruit;
    const playerId = this.props.playerId;
    const wheelbarrow = this.props.gamesRef.merchants[playerId].wheelbarrow;
    const abilities = this.props.gamesRef.merchants[playerId].abilities;
    const style = { margin: 12 };
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/great_mosque.png`} id="img-location" />
          <p>You can buy a tile if you have enough ressources<br /> and if you have not acquired it yet. <br /><br />When you aquire both Great Mosque<br /> tiles, you will earn a ruby.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(GreatMosque);
