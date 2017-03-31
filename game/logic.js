const {
  shuffle,
  bonusCards,
  largeMarketDemandTiles,
  smallMarketDemandTiles,
  getRandomPosition
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
  this.left = 0;
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
  this.position = new Position(getRandomPosition(4, 3));
  this.assistants = {
    count: 4
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
      ability: 'add1Assistant',
      img: ''
    },
    fruit: {
      acquired: false,
      ability: '2LiraToReturn1Assistant',
      img: ''
    },
    fabric: {
      acquired: false,
      ability: 'dieTurnOrRoll',
      img: ''
    },
    spice: {
      acquired: false,
      ability: '2LiraFor1Good',
      img: ''
    }
  };
}

function Position (coordinates) {
  this.coordinates = coordinates;

  const [x, y] = coordinates.split(',');
  this.x = +x;
  this.y = +y;

  // to figure out possible moves, make combos of up, down, left right
  const steps = [[0, 1], [0, -1], [-1, 0], [1, 0]]
  // add one-step moves
  const possibleMoves = steps.map(step => [this.x + step[0], this.y + step[1]].join(','))
  // add two-step moves
  for (let i = 0; i < steps.length; i++){
    for (var j = 0; j < steps.length; j++){
      const deltaX = this.x + steps[i][0] + steps[j][0];
      const deltaY = this.y + steps[i][1] + steps[j][1];
      possibleMoves.push([deltaX, deltaY].join(','))
    }
  }

  this.possibleMoves = possibleMoves
            .filter((coords, i) => possibleMoves.indexOf(coords) === i && coords !== this.coordinates)
}

module.exports = Game;
