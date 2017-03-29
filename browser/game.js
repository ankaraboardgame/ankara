export const levels = {
  basic: [
    ['great_mosque', 'fabric_warehouse', 'small_mosque'],
    ['fruit_warehouse', 'spice_warehouse', 'black_market'],
    ['caravansary', 'small_market', 'tea_house'],
    ['large_market', 'wainwright', 'gemstone_dealer']
    ],
  full: [
    ['great_mosque', 'PostOffice', 'fabric_warehouse', 'small_mosque'],
    ['fruit_warehouse', 'PoliceStation', 'Fountain', 'spice_warehouse'],
    ['black_market', 'caravansary', 'small_market', 'tea_house'],
    ['SultansPalace', 'large_market', 'wainwright', 'gemstone_dealer']
    ],
  long: [
    ['spice_warehouse', 'great_mosque', 'fabric_warehouse'],
    ['black_market', 'caravansary', 'large_market'],
    ['small_market', 'tea_house', 'wainwright'],
    ['fruit_warehouse', 'small_mosque', 'gemstone_dealer']
  ]
}

// let cells = document.querySelectorAll('.cell');

/**
 * Game constructor takes a level to determine location card order.
 * @param {string} level (e.g. 'basic' or 'full')
 */
export function Game (levelName){
  this.level = levels[levelName];
  this.grid = [];

  for (let y = 0; y < 3; y++){
    const row = [];
    for (let x = 0; x < 4; x++){
      row.push(new Location(this.level[x][y], x, y)); // to be replaced with objects accessed by hash table
    }
    this.grid.push(row);
  }
}

function Location(name, x, y){
  this.name = name;
  this.x = x;
  this.y = y;
  this.coords = `${x},${y}`;

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
            .filter((coords, i) => possibleMoves.indexOf(coords) === i && coords !== this.coords)
}
