import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { hideModal } from '../../redux/action-creators/modals';

class DisplayWinner extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.closeModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <div id="winner-modal-container">
          <h2>LAST ROUND</h2>
          <p>The game will finish in this current round!</p>
          <RaisedButton label="Okay" style={style} primary={true} onTouchTap={this.onClose}  />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.game.id,
  playerId: state.user.user.uid
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWinner);
