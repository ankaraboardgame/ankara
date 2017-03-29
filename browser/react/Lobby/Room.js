import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
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
    width: 500,
    padding: 20,
    margin: 20,
    backgroundColor: '#DABE96',
    textAlign: 'center',
    display: 'inline-block'
  };

  const deleteStyle = {
    cursor: 'pointer',
    width: 10,
    display: (roomData.creator === userId) ? 'inline' : 'none'
  }

  return (
      <Card style={paperStyle} zDepth={2}>

        <div
          style={deleteStyle}
          onClick={(evt) => {handleDeleteRoom(evt, roomId)}}>
          <Delete />
        </div>

        <CardHeader
          title={roomData.name}
          style={{fontWeight: 'bold', textAlign: 'center'}}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
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
          <CardActions>
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
          </CardActions>
        </CardText>
      </Card>
  )
}
