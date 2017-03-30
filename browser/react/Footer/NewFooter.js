import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import BonusCardsMosqueTiles from './BonusCards&MosqueTiles';

const Footer = ({ wheelbarrow, gameData, userId }) => {
  const playerNum = gameData.merchants[userId].number;
  const colorMap = { 0: 'red', 1: 'blue', 2: 'green', 3: 'yellow' };
  return (
    <div id="footer-container">
      <div id="new-footer">
        <img src={`images/player/${colorMap[playerNum]}player.png`} className="player-icon" />
        <p id="name">{gameData.playerMap[userId]}</p>
        <RulesSideBar />
        <img className="footer-icons" src="./images/cart/fabric.png" />
        <div id="notifications"><p>{wheelbarrow.fabric}</p></div>
        <img className="footer-icons" src="./images/cart/fruits.png" />
        <div id="notifications"><p>{wheelbarrow.fruit}</p></div>
        <img className="footer-icons" src="./images/cart/spices.png" />
        <div id="notifications"><p>{wheelbarrow.spice}</p></div>
        <img className="footer-icons" src="./images/cart/heirlooms.png" />
        <div id="notifications"><p>{wheelbarrow.heirloom}</p></div>
        <img className="footer-icons" src="./images/money/lira.png" />
        <div id="notifications"><p>{wheelbarrow.money}</p></div>
        <img className="footer-icons" src="./images/money/ruby.png" />
        <div id="notifications"><p>{wheelbarrow.ruby}</p></div>
      </div>
    </div>
  )
}

export default Footer
