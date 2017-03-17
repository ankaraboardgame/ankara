const levels = {
    basic: [
        'GreatMosque', 'FabricWarehouse', 'SmallMosque',
        'FruitWarehouse', 'SpiceWarehouse', 'BlackMarket',
        'Caravansary', 'SmallMarket', 'TeaHouse',
        'LargeMarket', 'Wainwright', 'GemstoneDealer'
        ],
    full: [
        'GreatMosque', 'PostOffice', 'FabricWarehouse', 'SmallMosque',
        'FruitWarehouse', 'PoliceStation', 'Fountain', 'SpiceWarehouse',
        'BlackMarket', 'Caravansary', 'SmallMarket', 'TeaHouse',
        'SultansPalace', 'LargeMarket', 'Wainwright', 'GemstoneDealer'
        ]
}

let grid = document.querySelectorAll('td');

/**
 * Game constructor takes a level to determine location card order.
 * @param {string} level (e.g. 'basic' or 'full')
 */
function Game (levelName){
    this.level = levels[levelName];
    this.grid = [];

    for (let y = 0; y < 4; y++){
        const row = [];
        for (let x = 0; x < 3; x++){
            row.push(new Location(this.level[x + y], x, y)); // to be replaced with objects accessed by hash table
        }
        this.grid.push(row);
    }
}

Game.prototype.start = function(){}

function Location(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.coords = `${x},${y}`;
    this.cell = document.getElementById(this.coords);

    // to figure out possible moves,
    // make combos of up, down, left right
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
    this.cell.innerHTML = `(${this.coords}) ${this.name}`;

    this.cell.addEventListener('mouseover', function(e){
        console.log(this.possibleMoves)
        grid.forEach(cell => {
            cell.setAttribute('style', 'background-color: none');
            if (this.possibleMoves.indexOf(cell.id) > -1){
                cell.setAttribute('style', 'background-color: cadetblue');
            }
        })
    }.bind(this))
}

const istanbul = new Game('basic');
