/** Game Logic */

function Game (playerIds){
  this.playerIds = playerIds;
  this.greatMosque = {
    leftCost: 1,
    rightCost: 1
  };
  this.greatMosque = {
    leftCost: 1,
    rightCost: 1
  };
  this.largeMarket = {
    demandTile: { fruit: 2, spice: 1, fabric: 2 }
  };
  this.smallMarket = {
    demandTile: { jewelry: 2, spice: 2, fabric: 1 }
  };
  this.caravansary = {
    bonusCards: {}
  };
  this.gemstoneDealer = 12;
  this.playerTurn = this.playerIds[0];
  this.locations = {};
  this.merchants = {};

  playerIds.forEach((id, i) => {
    this.merchants[id] = new Merchant(id, i);
  });
}

function Merchant (id, i){
  this.id = id;
  this.number = i;
  this.position = new Position();
  this.assistants = {};
  this.bonusCards = {};
  this.wheelbarrowSize = 3;
  this.fabric = 0;
  this.spice = 0;
  this.fruit = 0;
  this.rubies = 0;
  this.money = i + 2;
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
