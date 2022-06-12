import { INC_COINS, DEC_COINS } from '../types'

const INITIAL_STATE = {
  coins: 0,
  health: 0,
  exp: 0,
  inv: [],
}

const characterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INC_COINS:
      const incCoins = state.coins + action.payload
      return { ...state, coins: incCoins }
    case DEC_COINS:
      const decCoins = state.coins - action.payload
      return { ...state, coins: decCoins }
    default:
      return state
  }
}

export default characterReducer
