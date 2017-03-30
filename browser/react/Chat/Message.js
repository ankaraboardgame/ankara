import React from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

/** -------- Component ---------- */
/**
 * Creates cells for each location in the game
*/
export const Message = ({ data }) => {
  return (
    <div className="chat">
      <ListItem></ListItem>
      <div className="chat-name">
        { data.name }
      </div>
      <div className="chat-message">
        { data.message }
      </div>
    </div>
  );
};
