import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Modal from '../Modal/Modal';

import { hideModal } from '../../redux/action-creators/modals';

class DisplayWinner extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEndGame (){
    this.props.closeModal();
  }

  render() {
    return (
      <Modal>
        <div id="winner-modal-container">
          <h2>Winner</h2>
          <div>
            <RaisedButton label="OK" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndGame}  />
          </div>
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
  closeModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWinner);
