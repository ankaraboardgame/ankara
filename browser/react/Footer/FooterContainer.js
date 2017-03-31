import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

/** -------- Imported components -------- */
import RulesSideBar from './RulesSideBar';
import { ToastContainer } from 'react-toastify';
import NotificationContainer from '../Notification/NotificationContainer';

/** -------- Selectors --------- */
import { getUserNumber, getUserWheelbarrow, getUsername, getUserAssistants } from '../../redux/reducers/user-reducer';

/** -------- Presentational Component --------- */
const Footer = ({ playerNum, username, userWheelbarrow, assistants }) => {
  const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
  return (
    <div id="footer-container">
      <div id="new-footer">
        <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
        <text id="name">{username}</text>
        <RulesSideBar />
        <NotificationContainer />
        <ToastContainer autoClose={2500} position="top-right"/>
        <img className="footer-icons" src="./images/assistants.png" />
        <div id="notifications"><p>{assistants.count}</p></div>
        <img className="footer-icons" src="./images/cart/wheelbarrow.png" />
        <div id="notifications"><p>{userWheelbarrow.size}</p></div>
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
};

/** -------- Container Component ---------- */
const mapStateToProps = state => ({
  playerNum: getUserNumber(state),
  userWheelbarrow: getUserWheelbarrow(state),
  username: getUsername(state),
  assistants: getUserAssistants(state)
});

export default connect(mapStateToProps)(Footer);
