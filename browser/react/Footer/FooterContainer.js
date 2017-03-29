import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import GameHistorySideBar from '../GameHistory/GameHistorySideBar';

/** -------- Selectors --------- */
import { getUserNumber, getUserWheelbarrow, getUsername } from '../../redux/reducers/user-reducer';

/** -------- Presentational Component --------- */
const Footer = ({ playerNum, username, userWheelbarrow }) => {
  const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
  return (
    <div id="footer-container">
      <div id="new-footer">
        <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
        <text id="name">{username}</text>
        <RulesSideBar />
        <GameHistorySideBar />
        <img className="footer-icons" src="./images/cart/fabric.png" />
        <div id="notifications"><p>{userWheelbarrow.fabric}</p></div>
        <img className="footer-icons" src="./images/cart/fruits.png" />
        <div id="notifications"><p>{userWheelbarrow.fruit}</p></div>
        <img className="footer-icons" src="./images/cart/spices.png" />
        <div id="notifications"><p>{userWheelbarrow.spice}</p></div>
        <img className="footer-icons" src="./images/cart/heirlooms.png" />
        <div id="notifications"><p>{userWheelbarrow.heirloom}</p></div>
        <img className="footer-icons" src="./images/money/lira.png" />
        <div id="notifications"><p>{userWheelbarrow.money}</p></div>
        <img className="footer-icons" src="./images/money/ruby.png" />
        <div id="notifications"><p>{userWheelbarrow.ruby}</p></div>
      </div>
    </div>
  )
}

/** -------- Container Component ---------- */
const mapStateToProps = state => ({
  playerNum: getUserNumber(state),
  userWheelbarrow: getUserWheelbarrow(state),
  username: getUsername(state)
});

export default connect(mapStateToProps)(Footer);
