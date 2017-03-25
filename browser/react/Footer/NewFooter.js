import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import GameHistorySideBar from '../GameHistory/GameHistorySideBar';
import BonusCardsMosqueTiles from './BonusCards&MosqueTiles';

const Footer = (props) => {
  const wb = props.wheelbarrow;
  const gamesRef = props.gamesRef;
  const playerId = props.playerId;
  const playerNum = gamesRef.merchants[playerId].number;
  const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
  return (
    <div id="footer-container">
      <div id="new-footer">
        <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
        <p id="name">{gamesRef.playerMap[playerId]}</p>
        <RulesSideBar />
        <GameHistorySideBar />
        <img className="footer-icons" src="./images/cart/fabric.png" />
        <div id="notifications"><p>{wb.fabric}</p></div>
        <img className="footer-icons" src="./images/cart/fruits.png" />
        <div id="notifications"><p>{wb.fruit}</p></div>
        <img className="footer-icons" src="./images/cart/spices.png" />
        <div id="notifications"><p>{wb.spice}</p></div>
        <img className="footer-icons" src="./images/cart/heirlooms.png" />
        <div id="notifications"><p>{wb.heirloom}</p></div>
        <img className="footer-icons" src="./images/money/lira.png" />
        <div id="notifications"><p>{wb.money}</p></div>
        <img className="footer-icons" src="./images/money/ruby.png" />
        <div id="notifications"><p>{wb.ruby}</p></div>
      </div>
    </div>
  )
}

export default Footer
