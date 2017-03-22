import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionMaxGood } from '../../routes/location';

class FruitWarehouse extends React.Component {
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
          <img src={`images/locations/fruit_warehouse.png`} id="img-location" />
          <p>Look at all the fruits! <br /><br />You can now fully load your wheelbarrow with fruits. Come back later if you need more! <br /></p>
          <div>
            <RaisedButton label="Max fruit and end turn" style={style} primary={true} onTouchTap={this.handleMaxGoodEndTurn}  />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(hideModal()),
        openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
    }
};

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid,
  goodType: 'fruit'
})

export default connect(mapStateToProps, mapDispatchToProps)(FruitWarehouse);
