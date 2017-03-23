/** Game Logic */

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
  this.largeMarket = {
    currentMarketIdx: 0,
    demandTiles: [
      {img: 'smallmarket_1.jpg', fruit: 2, fabric: 1, heirloom: 1, spice: 1},
      {img: 'smallmarket_2.jpg', fruit: 1, fabric: 1, heirloom: 1, spice: 2},
      {img: 'smallmarket_3.jpg', fruit: 1, fabric: 1, heirloom: 0, spice: 3},
      {img: 'smallmarket_4.jpg', fruit: 2, fabric: 1, heirloom: 0, spice: 2},
      {img: 'smallmarket_5.jpg', fruit: 2, fabric: 0, heirloom: 1, spice: 2}
    ]
  };
  this.smallMarket = {
    currentMarketIdx: 0,
    demandTiles: [
      {img: 'smallmarket_1.jpg', fruit: 2, fabric: 1, heirloom: 1, spice: 1},
      {img: 'smallmarket_2.jpg', fruit: 1, fabric: 1, heirloom: 1, spice: 2},
      {img: 'smallmarket_3.jpg', fruit: 1, fabric: 1, heirloom: 0, spice: 3},
      {img: 'smallmarket_4.jpg', fruit: 2, fabric: 1, heirloom: 0, spice: 2},
      {img: 'smallmarket_5.jpg', fruit: 2, fabric: 0, heirloom: 1, spice: 2}
    ]
  };
  this.caravansary = {
    bonusCards: {}
  };
  this.gemstoneDealer = 12;
  this.playerTurn = this.playerIds[0];
  this.merchants = {};

  this.playerIds.forEach((id, i) => {
    this.merchants[id] = new Merchant(id, i);
  });

  this.smallMarket.demandTiles = shuffle(this.smallMarket.demandTiles);
  this.largeMarket.demandTiles = shuffle(this.largeMarket.demandTiles);
}

function shuffle(array){
  let i = 0, j = 0, temp = null;
  for(let i = array.length-1; i > 0; i--){
    j = Math.floor(Math.random()*(i+1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
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
    jewelry: 0,
    money: i + 2,
    size: 2
  };
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
