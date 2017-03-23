import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { actionBuyWbExt } from '../../routes/location';

class Wainwright extends React.Component {
  constructor(props) {
    super(props);
    this.handleLocationAction = this.handleLocationAction.bind(this);
  }

  handleLocationAction(){
    actionBuyWbExt(this.props.gameId, this.props.playerId)
    this.props.closeModal()
  }

  render() {
    const style = { margin: 12 }
    return (
      <Modal>
        <div id="location-modal-container">
          <img src={`images/locations/wainwright.png`} id="img-location" />
        </div>
        <div>
          <RaisedButton label="Buy an Extension" style={style} primary={true} onTouchTap={this.handleLocationAction}  />
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
  playerId: state.user.user.uid
})

export default connect(mapStateToProps, mapDispatchToProps)(Wainwright);
