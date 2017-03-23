const {
  shuffle,
  bonusCards,
  largeMarketDemandTiles,
  smallMarketDemandTiles
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
    leftCost: 1,
    rightCost: 1
  };
  this.greatMosque = {
    leftCost: 1,
    rightCost: 1
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
}

function Merchant (id, i){
  this.id = id;
  this.number = i;
  this.position = new Position();
  this.assistants = {};
  this.assistantsCount = 4;
  this.bonusCards = {};
  this.wheelbarrow = {
    fabric: 0,
    spice: 0,
    fruit: 0,
    ruby: 0,
    heirloom: 0,
    money: i + 2,
    size: 2
  }
  this.abilities = {};

  for (let i = 0; i < 4; i++){
    this.assistants[i] = new Assistant(i); // initialize assistants
  }
}

function Assistant (id){
  this.id = id;
  this.position = '0,0';
}

function Position (coords = '0,0', possibleMoves = ['1,0', '2,0', '0,1', '1,1', '0,2']) {
  this.coordinates = coords;
  this.possibleMoves = possibleMoves;
}

module.exports = Game;
