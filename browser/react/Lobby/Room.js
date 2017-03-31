import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import Delete from 'material-ui/svg-icons/action/delete';

export const Room = props => {
  const {
    roomId,
    roomData,
    userId,
    joined,
    handleReady,
    handleDeleteRoom,
    handleLeaveRoom,
    handleJoinRoom
  } = props;

  const paperStyle = {
    backgroundImage: 'url("images/splash-menu.png")',
    backgroundSize: '100% 100%',
    width: 400,
    height: 'auto',
    padding: 20,
    margin: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    display: 'inline-block'
  };

  const deleteStyle = {
    cursor: 'pointer',
    width: 10,
    display: (roomData.creator === userId) ? 'inline' : 'none'
  }

  return (
    <Paper style={paperStyle} zDepth={0}>

      <h4 style={{fontWeight: 'bold', textAlign: 'center'}}>
        {roomData.name}
      </h4>

      {
        roomData.users &&
        <List style={{textAlign: 'center'}}>
          {
            Object.keys(roomData.users).map(uid => {
              return (
                <ListItem
                  key={ uid }
                  onClick={(evt) => handleLeaveRoom(evt, roomId, uid)}
                  rightIcon={ <HighlightOff /> }>
                  { roomData.users[uid] }
                </ListItem>
              );
            })
          }
        </List>
      }

      <form onSubmit={(evt) => {handleJoinRoom(evt, roomId, userId)}}>
        <TextField
          hintText="Enter nickname"
          style={{marginLeft: 20}}
          disabled={!!joined}
        />
        <RaisedButton type="submit" disabled={!!joined}>
          JOIN
        </RaisedButton>
      </form>

      <RaisedButton
        secondary={true}
        style={{margin: 15}}
        onTouchTap={(evt) => handleReady(evt, roomId, roomData.users)}
        disabled={!(joined === roomId)}>
        READY
      </RaisedButton>

      {
        props.ready && props.roomId === props.joined &&
        <p>Waiting for { Object.keys(roomData.users).length - Object.keys(roomData.ready).length } to be ready...</p>
      }

      <br />
      <div
        style={deleteStyle}
        onClick={(evt) => {handleDeleteRoom(evt, roomId)}}>
        <Delete />
      </div>

    </Paper>
  )
}
