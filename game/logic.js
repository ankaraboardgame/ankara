const {
  shuffle,
  bonusCards,
  largeMarketDemandTiles,
  smallMarketDemandTiles,
  getRandomPosition,
} = require('./accessories.js');

/**
 * Game Logic
 * @param {integer} gameId
 * @param {object} usersObj
 */
function Game (gameId, usersObj){
  this.id = gameId;
  this.playerIds = Object.keys(usersObj);
  this.playerMap = usersObj;
  this.smallMosque = {
    fabric: 2,
    spice: 2
  };
  this.greatMosque = {
    heirloom: 2,
    fruit: 2
  };
  this.smallMarket = {
    currentMarketIdx: 0,
    demandTiles: shuffle(smallMarketDemandTiles)
  };
  this.largeMarket = {
    currentMarketIdx: 0,
    demandTiles: shuffle(largeMarketDemandTiles)
  };
  this.caravansary = {
    index: 0,
    bonusCards: shuffle(bonusCards)
  };
  this.gemstoneDealer = 12;
  this.playerTurn = this.playerIds[0];
  this.merchants = {};

  this.playerIds.forEach((id, i) => {
    this.merchants[id] = new Merchant(id, i);
  });

  this.smuggler = {};
  this.smuggler.coordinates = getRandomPosition(4, 3);

}

function Merchant (id, i){
  this.id = id;
  this.number = i;
  this.position = new Position();
  this.assistants = {
    count: 4,
    out: {}
  };
  this.bonusCards = {
    oneGood: 0,
    fiveLira: 0
  };
  this.wheelbarrow = {
    fabric: 0,
    spice: 0,
    fruit: 0,
    ruby: 0,
    heirloom: 0,
    money: i + 2,
    size: 2
  }
  this.abilities = {
    heirloom: {
      acquired: false,
      ability: 'add1Assistant'
    },
    fruit: {
      acquired: false,
      ability: '2LiraToReturn1Assistant'
    },
    fabric: {
      acquired: false,
      ability: 'dieTurnOrRoll'
    },
    spice: {
      acquired: false,
      ability: '2LiraFor1Good'
    }
  };
}

function Position (coords = '0,0', possibleMoves = ['1,0', '2,0', '0,1', '1,1', '0,2']) {
  this.coordinates = coords;
  this.possibleMoves = possibleMoves;
}

module.exports = Game;
