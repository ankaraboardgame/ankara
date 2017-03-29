import React from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

/** -------- Component ---------- */
/**
 * Creates cells for each location in the game
*/
export const Message = props => {
  return (
    <div className="chat">
      <ListItem></ListItem>
      <div className="chat-name">
        {
          props.data.name
        }
      </div>
      <div className="chat-message">
        {
          props.data.message
        }
      </div>
    </div>
  );
};