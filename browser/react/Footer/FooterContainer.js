import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Drawer from 'material-ui/Drawer';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import GameHistorySideBar from '../GameHistory/GameHistorySideBar';

/** -------- Selectors --------- */
import { getUserNumber, getUserWheelbarrow, getUsername } from '../../redux/reducers/user-reducer';

/** -------- Presentational Component --------- */
/*const Footer = ({ playerNum, username, userWheelbarrow }) => {
  const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
  return (
    <div>
      <div id="new-footer">
        <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
        <p id="name">{username}</p>
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
}*/

/** -------- Stateful Component ---------- */

class FooterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false
    }
    
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({display: true});
  }

  handleMouseOut() {
    this.setState({display: false});
  }

  render() {
    const { playerNum, username, userWheelbarrow } = this.props;
    return (
      <div id="footer-fixed">
        <text onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>hover here</text>
        { 
          this.state.display ?
          this.renderFooter() : null 
        }
      </div>
    );
  }

  renderFooter() {
    const { playerNum, username, userWheelbarrow } = this.props;
    const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
    return (
      <div id="footer-container">
        <div id="new-footer">
          <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
          <p id="name">{username}</p>
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
}

/** -------- Container Component ---------- */
const mapStateToProps = state => ({
  playerNum: getUserNumber(state),
  userWheelbarrow: getUserWheelbarrow(state),
  username: getUsername(state)
});

export default connect(mapStateToProps)(FooterContainer);
