import { combineReducers } from 'redux'

/******** Reducers ********/
import player from './player'

/****** Root Reducer ******/

// here is a sample state
var sampleState = 
{
  players: {
    id1: { 
      turn: true,
      merchant: {
        position: 2,
        length: 1 // # of assistants with merchant
      },
      assistants: { // how to manage this list without arrays?
        1: { position: 5 },
        2: { position: 9 },
        3: { position: 10 }
      },
      wheelbarrowLength: 4,
      jewelry: 2,
      fruit: 4,
      fabric: 4,
      spice: 0,
      money: 25,
      rubies: 1,
      mosqueTiles: {
        diceRoll: true,
      },
      bonusCards: {
        gainOneGood: true,
        moveThreeFour: true
      }
    },
    id2: { active: false },
    id3: { /***/ }
  },
  greatMosque: {
    rightCost: 1,
    leftCost: 2,
  },
  smallMosque: {
    rightCost: 1,
    leftCost: 1
  },
  largeMarket: {
    demandTile: { fruit: 2, spice: 1, fabric: 2 }
  },
  smallMarket: {
    demandTile: { jewelry: 2, spice: 2, fabric: 1 }
  },
  caravansary: {
    bonusCards: {} // an array-like object
  },
  gemstoneDealer: 15
}

const rootReducer = combineReducers({
  player
})

export default rootReducer
