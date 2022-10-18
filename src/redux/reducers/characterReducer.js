import {
  INC_COINS,
  DEC_COINS,
  INC_EXP,
  DEC_EXP,
  FETCH_CHARACTER_DATA,
  UPDATE_INVENTORY,
} from '../types'

const INITIAL_STATE = {
  coins: 0,
  health: 0,
  exp: 0,
  inventory: [],
}

const characterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_DATA:
      return { ...state, ...action.payload }
    case INC_COINS:
      const incCoins = state.coins + action.payload
      return { ...state, coins: incCoins }
    case DEC_COINS:
      const decCoins = state.coins - action.payload
      return { ...state, coins: decCoins }
    case INC_EXP:
      const incExp = state.exp + action.payload
      return { ...state, exp: incExp }
    case DEC_EXP:
      const decExp = state.exp - action.payload
      return { ...state, exp: decExp }
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      }
    default:
      return state
  }
}

export default characterReducer
