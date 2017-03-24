const admin = require('firebase-admin');
const db = admin.database();
const roomsRef = db.ref('rooms');
const gamesRef = db.ref('games');
const gameHistoryRef = db.ref('gameHistory');

const util = require('./util');
const log = util.log;
const getCurrUnixTime = util.getCurrUnixTime;

const GameLogger = function() {

  /** Attach firebase event listener for each game */
  gamesRef.on('child_added', snapshot => {
    const gameAdded = snapshot.val();
    const gameId = gameAdded.id;
    const playerMap = gameAdded.playerMap;

    const ignoreFirstEvent = {};

    gameHistoryRef.child(gameId).once('value', function(snapshot) {

      //Log players who joined the game
      Object.keys(playerMap).forEach(mapKey => {

        log(gameId, {
          text: `${playerMap[mapKey]} joined the game`,
          timestamp: getCurrUnixTime()
        });
      });

    })
    .then(console.error);

    // Player turn change
    gamesRef.child(gameId).child('playerTurn').on('value', snapshot => {
      const activePlayerId = snapshot.val();
      log(gameId, {
        text: `${playerMap[activePlayerId]}\'s turn`,
        timestamp: getCurrUnixTime()
      });
    })
    .then(console.error);

    // Gemstone price change
    gamesRef.child(gameId).child('gemstoneDealer').on('value', snapshot => {
      const newGemStonePrice = snapshot.val();
      log(gameId, {
        text: `Gem stone is currently being sold at ${newGemStonePrice} liras`,
        timestamp: getCurrUnixTime()
      });
    })
    .then(console.error);

    // // Small market demand change
    // gamesRef.child(gameId).child('smallMarket').child('demandTile').on('value', snapshot => {
    //   const newDemand = snapshot.val();
    //   log(gameId, {
    //     text: `Small market is trading ${ Object.keys(newDemand).map(good => `${newDemand[good]} ${good}(s)` ) } now`,
    //     timestamp: getCurrUnixTime()
    //   });
    // });

    // // Big market demand change
    // gamesRef.child(gameId).child('largeMarket').child('demandTile').on('value', snapshot => {
    //   const newDemand = snapshot.val();
    //   log(gameId, {
    //     text: `Large market is trading ${ Object.keys(newDemand).map(good => `${newDemand[good]} ${good}(s) ` ) } now`,
    //     timestamp: getCurrUnixTime()
    //   });
    // });

    Object.keys(playerMap).forEach(playerId => {
      const displayName = playerMap[playerId];

      // Merchant position change
      let initialPosition = undefined;
      gamesRef.child(gameId).child('merchants').child(playerId).child('position').child('coordinates').on('value', snapshot => {
        const newPosition = snapshot.val();
        if(!initialPosition) {
          initialPosition = newPosition;
        } else {
          log(gameId, {
            text: `${displayName} moved to new position ${newPosition}`,
            timestamp: getCurrUnixTime()
          });
        }
      })
      .then(console.error);

      // Wheelbarrow size increment
      let initialSize = undefined;
      gamesRef.child(gameId).child('merchants').child(playerId).child('wheelbarrow').child('size').on('value', snapshot => {
        const newSize = snapshot.val();
        if(!initialSize) {
          initialSize = newSize;
        } else {
          log(gameId, {
            text: `${displayName}'s wheelbarrow size has increased to ${newSize}`,
            timestamp: getCurrUnixTime()
          });
        }
      })
      .then(console.error);

      // ruby change
      let initialRuby = undefined;
      gamesRef.child(gameId).child('merchants').child(playerId).child('wheelbarrow').child('ruby').on('value', snapshot => {
        const ruby = snapshot.val();
        if(!initialRuby) {
          initialRuby = ruby;
        } else {
          log(gameId, {
            text: `${displayName} earned a ruby. ${displayName} has ${ruby} ${ruby === 1 ? 'ruby' : 'rubies'} now`,
            timestamp: getCurrUnixTime()
          });
        }
      })
      .then(console.error);

      // money amount change
      // gamesRef.child(gameId).child('merchants').child(playerId).child('wheelbarrow').child('money').on('value', snapshot => {
      //   const newSize = snapshot.val();
      //   log(gameId, {
      //     text: `${displayName}'s wheelbarrow size has increased to ${newSize}`,
      //     timestamp: getCurrUnixTime()
      //   });
      // });

    });

    /*
      money earned
      dropped assistant/picked up assistant?
    */

  });


}

module.exports = GameLogger;
