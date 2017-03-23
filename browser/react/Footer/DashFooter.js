import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Heirlooms, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import GameHistorySideBar from '../GameHistory/GameHistorySideBar';
import BonusCardsMosqueTiles from './BonusCards&MosqueTiles';
import PlayerInfo from './PlayerColor&Name';

const Footer = (props) => {
  const wb = props.wheelbarrow;
  const gamesRef = props.gamesRef;
  const playerId = props.playerId;
  return (
    <footer className="black">
      <div id="dash-footer">
        <PlayerInfo gamesRef={gamesRef} playerId={playerId} />
        <RulesSideBar />
        <GameHistorySideBar />
        <Badge
          className="badge"
          badgeContent={wb.size}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Wheelbarrow tooltip="Wheelbarrow">
            <NotificationsIcon />
          </Wheelbarrow>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.fruit}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Fruits tooltip="Fruits">
            <NotificationsIcon />
          </Fruits>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.fabric}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Fabric tooltip="Fabric">
            <NotificationsIcon />
          </Fabric>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.spice}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Spices tooltip="Spices">
            <NotificationsIcon />
          </Spices>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.heirloom}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Heirlooms tooltip="Heirlooms">
            <NotificationsIcon />
          </Heirlooms>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.money}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Money tooltip="Money">
            <NotificationsIcon />
          </Money>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wb.ruby}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Ruby tooltip="Rubies">
            <NotificationsIcon />
          </Ruby>
        </Badge>
      </div>
    </footer>
  )
}

export default Footer
