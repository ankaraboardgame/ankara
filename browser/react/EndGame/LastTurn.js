import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { bounceInLeft } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/** ------ Imported Components ------- */
import Modal from '../Modal/Modal';

/** ------ Action creators ------- */
import { hideModal } from '../../redux/action-creators/modals';

/** ------ Animation Styles -------- */
const animateStyles = StyleSheet.create({
  bounceInLeft: {
    animationName: bounceInLeft,
    animationDuration: '1s'
  }
});

/** ------- Component -------- */
const LastTurn = props => {
  return (
    <div className={css(animateStyles.bounceInLeft)} id="last-round-container">
      <img src="images/last-round.png" style={{width: '250px'}} />
    </div>
  );
};

export default LastTurn;
