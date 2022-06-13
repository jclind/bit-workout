import { DEC_COINS, INC_COINS } from '../../types'

export const logWorkout = reps => async dispatch => {
  const numCoins = Math.ceil(reps * 0.8)

  dispatch(addCoins(numCoins))
}

export const addCoins = numCoins => async (dispatch, state) => {
  const uid = state.auth.userAuth.uid

  dispatch({
    type: INC_COINS,
    payload: numCoins,
  })
}
export const removeCoins = numCoins => async (dispatch, state) => {
  const uid = state.auth.userAuth.uid

  dispatch({
    type: DEC_COINS,
    payload: numCoins,
  })
}
