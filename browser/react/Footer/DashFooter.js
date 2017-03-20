import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import { Wheelbarrow, Fruits, Fabric, Spices, Gems, Money, Ruby } from './FooterComponents'
import RulesDialog from './RulesDialog';

const Footer = (props) => {
  const wbstate = props.wbstate;
  return (
    <footer className="black">
      <div id="dash-footer">
        <Badge
          className="badge"
          badgeContent={wbstate.wb_length}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Wheelbarrow tooltip="Wheelbarrow">
            <NotificationsIcon />
          </Wheelbarrow>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.fruits}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Fruits tooltip="Fruits">
            <NotificationsIcon />
          </Fruits>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.fabric}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Fabric tooltip="Fabric">
            <NotificationsIcon />
          </Fabric>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.spices}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Spices tooltip="Spices">
            <NotificationsIcon />
          </Spices>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.gems}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Gems tooltip="Gems">
            <NotificationsIcon />
          </Gems>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.money}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Money tooltip="Money">
            <NotificationsIcon />
          </Money>
        </Badge>
        <Badge
          className="badge"
          badgeContent={wbstate.ruby}
          secondary={true}
          badgeStyle={{top: 0, right: 0}}>
          <Ruby tooltip="Rubies">
            <NotificationsIcon />
          </Ruby>
        </Badge>
        <RulesDialog />
      </div>
    </footer>
  )
}

export default Footer
