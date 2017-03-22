import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Gems, Money, Ruby } from './FooterComponents'
import RulesSideBar from './RulesSideBar';
import BonusCardsMosqueTiles from './BonusCards&MosqueTiles';

const Footer = (props) => {
  const wb = props.wheelbarrow;
  return (
    <footer className="black">
      <div id="dash-footer">
        <RulesSideBar />
        <BonusCardsMosqueTiles/>
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
          badgeContent={wb.jewelry}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Gems tooltip="Gems">
            <NotificationsIcon />
          </Gems>
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