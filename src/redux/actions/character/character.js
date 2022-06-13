import { DEC_COINS, DEC_EXP, INC_COINS, INC_EXP } from '../../types'

export const logWorkout = reps => async dispatch => {
  const numCoins = Math.ceil(reps * 0.8)
  const exp = Math.ceil(reps * 0.5)

  dispatch(addCoins(numCoins))
  dispatch(addExp(exp))
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
