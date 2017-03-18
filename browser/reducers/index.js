import { combineReducers } from 'redux'

/******** Reducers ********/
import player from './player'

/****** Root Reducer ******/
const rootReducer = combineReducers({
  player
})

export default rootReducer
