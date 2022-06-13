import { DEC_COINS, DEC_EXP, INC_COINS, INC_EXP } from '../../types'

export const calcCoins = reps => {
  return Math.ceil(reps * 0.8)
}
export const calcExp = reps => {
  return Math.ceil(reps * 0.5)
}

export const logWorkout = reps => async dispatch => {
  dispatch(addCoins(calcCoins(reps)))
  dispatch(addExp(calcExp(reps)))
}

export const addCoins = numCoins => async (dispatch, state) => {
  dispatch({
    type: INC_COINS,
    payload: numCoins,
  })
}
export const removeCoins = numCoins => async (dispatch, state) => {
  dispatch({
    type: DEC_COINS,
    payload: numCoins,
  })
}
export const addExp = exp => async (dispatch, state) => {
  dispatch({
    type: INC_EXP,
    payload: exp,
  })
}
export const removeExp = exp => async (dispatch, state) => {
  dispatch({
    type: DEC_EXP,
    payload: exp,
  })
}
