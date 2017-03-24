function shuffle(array) {
  var currIdx = array.length
    , tmp
    , randIdx
    ;
  while (0 !== currIdx) {
    randIdx = Math.floor(Math.random() * currIdx);
    currIdx -= 1;
    tmp = array[currIdx];
    array[currIdx] = array[randIdx];
    array[randIdx] = tmp;
  }
  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(max_x, max_y) {
  return `${getRandomInt(0,max_x)},${getRandomInt(0,max_y)}`;
}

const bonusCards = [
  {type: 'fiveLira', img: 'five-lira.png'},
  {type: 'fiveLira', img: 'five-lira.png'},
  {type: 'fiveLira', img: 'five-lira.png'},
  {type: 'fiveLira', img: 'five-lira.png'},
  {type: 'oneGood', img: 'one-good.png'},
  {type: 'oneGood', img: 'one-good.png'},
  {type: 'oneGood', img: 'one-good.png'},
  {type: 'oneGood', img: 'one-good.png'}
];

const largeMarketDemandTiles = [
  {img: 'largemarket_1.jpg', fruit: 0, fabric: 2, heirloom: 2, spice: 1},
  {img: 'largemarket_2.jpg', fruit: 0, fabric: 1, heirloom: 3, spice: 1},
  {img: 'largemarket_3.jpg', fruit: 1, fabric: 2, heirloom: 2, spice: 0},
  {img: 'largemarket_4.jpg', fruit: 1, fabric: 1, heirloom: 3, spice: 0},
  {img: 'largemarket_5.jpg', fruit: 1, fabric: 1, heirloom: 2, spice: 1}
];

const smallMarketDemandTiles = [
  {img: 'smallmarket_1.jpg', fruit: 2, fabric: 1, heirloom: 1, spice: 1},
  {img: 'smallmarket_2.jpg', fruit: 1, fabric: 1, heirloom: 1, spice: 2},
  {img: 'smallmarket_3.jpg', fruit: 1, fabric: 1, heirloom: 0, spice: 3},
  {img: 'smallmarket_4.jpg', fruit: 2, fabric: 1, heirloom: 0, spice: 2},
  {img: 'smallmarket_5.jpg', fruit: 2, fabric: 0, heirloom: 1, spice: 2}
];

module.exports = {
  shuffle,
  bonusCards,
  largeMarketDemandTiles,
  smallMarketDemandTiles,
  getRandomPosition
};
