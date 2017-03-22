import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionMaxGood } from '../../routes/location';

class FabricWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMaxGoodEndTurn = this.handleMaxGoodEndTurn.bind(this);
  }

  handleMaxGoodEndTurn(){
    actionMaxGood(this.props.gameId, this.props.playerId, this.props.goodType)
    this.props.closeModal();
  }

  render() {
    const style = { margin: 12 }
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/fabric_warehouse.png`} id="img-location" />
          <p>Look at all the fabric! <br /><br />You can now fully load your wheelbarrow with fabric. Come back later if you need more! <br /></p>
          <div>
            <RaisedButton label="Max fabric and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn}  />
          </div>
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
  gameId: state.game.id,
  playerId: state.user.user.uid,
  goodType: 'fabric'
})

export default connect(mapStateToProps, mapDispatchToProps)(FabricWarehouse);
