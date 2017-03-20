/** Game Logic */

function Game (){
  this.merchants = {};
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
  this.gemstoneDealer = 13;

  for (var i = 0; i < 4; i++){
    this.merchants[i] = new Merchant(i); // initialize merchants
  }
}

Game.prototype.sayHello = function(){
  return 'Hello from the Game';
}

function Merchant (num){
  this.number = num;
  this.position = null;
  this.assistants = {};
  this.bonusCards = {};
  this.goods = {};
  this.wheelbarrowSize = 3;
  this.rubies = 0;
  this.money = 2 + num;
  this.abilities = {};

  for (var i = 0; i < 4; i++){
    this.assistants[i] = new Assistant(i); // initialize assistants
  }
}

function Assistant (num){
  this.number = num;
  this.position = null;
}

module.exports = Game;
