import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionMaxGood } from '../../routes/location';

class SpiceWarehouse extends React.Component {
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
          <img src={`images/locations/spice_warehouse.png`} id="img-location" />
          <p>Look at all the spices! <br /><br />Your wheelbarrow is now fully loaded with spices. Come back later if you need more! <br /></p>
          <div>
            <RaisedButton label="Max spice and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn}  />
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
  goodType: 'spice'
})

export default connect(mapStateToProps, mapDispatchToProps)(SpiceWarehouse);
