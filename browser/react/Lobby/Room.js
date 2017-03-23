import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import Delete from 'material-ui/svg-icons/action/delete';

export const Room = props => {

  function showUser (userKey, i) {
      return (
        <ListItem key={ userKey } onClick={(evt) => props.handleLeaveRoom(evt, props.roomId, userKey)} rightIcon={<HighlightOff />}>
          { props.users[userKey] }
        </ListItem>
      );
    }

  const paperStyle = {
    height: 500,
    width: 500,
    padding: 20,
    margin: 20,
    backgroundColor: 'navajowhite',
    textAlign: 'center',
    display: 'inline-block'
  };

  return (
      <Paper style={paperStyle} zDepth={2}>
        <div style={{ cursor: 'pointer', width: 10 }} onClick={(evt) => {props.handleDeleteRoom(evt, props.roomId)}}>
          <Delete />
        </div>
        <Subheader style={{textAlign: 'center'}}>{ props.roomName }</Subheader>
        {
          props.users &&
          <List style={{textAlign: 'center'}}>{ Object.keys(props.users).map(showUser) }</List>
        }
        <form onSubmit={(evt) => {props.handleJoinRoom(evt, props.roomId, props.userId)}}>
          <TextField
            hintText="Enter nickname"
            style={{marginLeft: 20}}
            disabled={!!props.joined}
          />
          <RaisedButton type="submit" disabled={!!props.joined}>
            JOIN
          </RaisedButton>
        </form>
        <RaisedButton secondary={true} style={{margin: 15}} onTouchTap={(evt) => props.handleStart(evt, props.roomId)}>
          START
        </RaisedButton>
      </Paper>
  )
}
