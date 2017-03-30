const admin = require('firebase-admin');
const db = admin.database();
const roomsRef = db.ref('rooms');
const gamesRef = db.ref('games');
const gameLogRef = db.ref('gameLog');

const util = require('./util');
const log = util.log;

const GameLogger = function() {

  /** Attach firebase event listener for each game */
  gamesRef.on('child_added', snapshot => {
    const gameAdded = snapshot.val();
    const gameId = gameAdded.id;
    const playerMap = gameAdded.playerMap;

    const ignoreFirstEvent = {};

    gameLogRef.child(gameId).once('value', function(snapshot) {

      //Log players who joined the game
      Object.keys(playerMap).forEach(key => {

        log(gameId, {
          user: key,
          text: `$ joined the game`,
          timestamp: admin.database.ServerValue.TIMESTAMP
        });
      });

    })

    // Player turn change
    gamesRef.child(gameId).child('playerTurn').on('value', snapshot => {
      const activePlayerId = snapshot.val();
      log(gameId, {
        user: activePlayerId,
        text: `$\'s turn`,
        timestamp: admin.database.ServerValue.TIMESTAMP
      });
    })

    // Gemstone price change
    gamesRef.child(gameId).child('gemstoneDealer').on('value', snapshot => {
      const newGemStonePrice = snapshot.val();
      log(gameId, {
        text: `Gem stone is now being sold at ${newGemStonePrice} liras`,
        timestamp: admin.database.ServerValue.TIMESTAMP
      });
    })

    // // Small market demand change
    // gamesRef.child(gameId).child('smallMarket').child('demandTile').on('value', snapshot => {
    //   const newDemand = snapshot.val();
    //   log(gameId, {
    //     text: `Small market is trading ${ Object.keys(newDemand).map(good => `${newDemand[good]} ${good}(s)` ) } now`,
    //     timestamp: admin.database.ServerValue.TIMESTAMP
    //   });
    // });

    // // Big market demand change
    // gamesRef.child(gameId).child('largeMarket').child('demandTile').on('value', snapshot => {
    //   const newDemand = snapshot.val();
    //   log(gameId, {
    //     text: `Large market is trading ${ Object.keys(newDemand).map(good => `${newDemand[good]} ${good}(s) ` ) } now`,
    //     timestamp: admin.database.ServerValue.TIMESTAMP
    //   });
    // });

    Object.keys(playerMap).forEach(playerId => {
      const displayName = playerMap[playerId];

      // Merchant position change
      // let initialPosition = undefined;
      // gamesRef.child(gameId).child('merchants').child(playerId).child('position').child('coordinates').on('value', snapshot => {
      //   const newPosition = snapshot.val();
      //   if(!initialPosition) {
      //     initialPosition = newPosition;
      //   } else {
      //     log(gameId, {
      //       user: playerId,
      //       text: `$ moved to new position ${newPosition}`,
      //       timestamp: admin.database.ServerValue.TIMESTAMP
      //     });
      //   }
      // })

      // Wheelbarrow size increment
      let initialSize = undefined;
      gamesRef.child(gameId).child('merchants').child(playerId).child('wheelbarrow').child('size').on('value', snapshot => {
        const newSize = snapshot.val();
        if(!initialSize) {
          initialSize = newSize;
        } else {
          log(gameId, {
            user: playerId,
            text: `$'s wheelbarrow size has increased to ${newSize}`,
            timestamp: admin.database.ServerValue.TIMESTAMP
          });
        }
      })

      // ruby change
      let initialRuby = undefined;
      gamesRef.child(gameId).child('merchants').child(playerId).child('wheelbarrow').child('ruby').on('value', snapshot => {
        const ruby = snapshot.val();
        if(!initialRuby) {
          initialRuby = ruby;
        } else {
          log(gameId, {
            user: playerId,
            text: `$ earned a ruby. ${ruby} ${ruby === 1 ? 'ruby' : 'rubies'} now`,
            timestamp: admin.database.ServerValue.TIMESTAMP
          });
        }
      })

    });

  });


}

module.exports = GameLogger;
