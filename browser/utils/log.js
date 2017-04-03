const LOGTYPE = {
  PLAYER_MOVE: 'PLAYER_MOVE',
  SMUGGLER_MOVE: 'SMUGGLER_MOVE',
  GAME_JOIN: 'GAME_JOIN',
  TURN: 'TURN'
}

const LOCATION_NAME = {
  'great_mosque': 'Great Mosque',
  'fabric_warehouse': 'Fabric Warehouse',
  'small_mosque': 'Small Mosque',
  'fruit_warehouse': 'Fruit Warehouse',
  'spice_warehouse': 'Spice Warehouse',
  'black_market': 'Black Market',
  'caravansary': 'Caravansary',
  'small_market': 'Small Market',
  'tea_house': 'Tea House',
  'large_market': 'Large Market',
  'wainwright': 'Wainwright',
  'gemstone_dealer': 'Gemstone Dealer'
}

/**
 * Given an array of log objects format them to array string log messages
 * Input: Array of log objects
 * Output: Array of string
 */
export const sortLogs = gameLog => {

  return Object.keys(gameLog)
  .map(key => {
    return gameLog[key];
  }).sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
}


/**
 * Given a log object output a log message in string type.
 *
 * Input: Log object and other information about player and location card.
 * Output: Log message in string.
*/
export const formatLogMessage = (messageObj, playerMap, board, currentUserId) => {

  const playerId = messageObj.user;
  const type = messageObj.type;
  const location = messageObj.location;

  // Get coordinates from string
  const coords = location && location.split(',').map(str => Number(str));
  // Get Location name from coordinates
  const locationName = LOCATION_NAME[coords && board.level[coords[0]][coords[1]]];
  let message = undefined;
  switch(type) {
    case LOGTYPE.TURN:
      if (playerId === currentUserId) {
        message = 'Your turn';
      } else {
        message = `${playerMap[playerId]}'s turn`
      }
      break;
    case LOGTYPE.GAME_JOIN:
      if (playerId === currentUserId) {
        message = 'You joined the game';
      } else {
        message = `${playerMap[playerId]} joined the game`
      }
      break;
    case LOGTYPE.PLAYER_MOVE:
      if (playerId === currentUserId) {
        message = `You moved to ${locationName}`;
      } else {
        message = `${playerMap[playerId]} moved to ${locationName}`;
      }
      break;
    case LOGTYPE.SMUGGLER_MOVE:
      message = `Smuggler moved to ${locationName}`;
      break;
    default:
      message = '';
      break;
  }

  return message;
}
