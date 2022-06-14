import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import {
  DEC_COINS,
  DEC_EXP,
  FETCH_CHARACTER_DATA,
  INC_COINS,
  INC_EXP,
} from '../../types'

export const fetchCharacterData = uid => async dispatch => {
  await getDoc(doc(db, 'characterData', uid)).then(document => {
    const characterData = document.data()
    dispatch({ type: FETCH_CHARACTER_DATA, payload: characterData })
  })
}

export const calcCoins = reps => {
  return Math.ceil(reps * 0.5)
}
export const calcExp = reps => {
  return Math.ceil(reps * 0.8)
}

export const logWorkout = reps => async (dispatch, getState) => {
  const character = getState().character
  const uid = getState().auth.userAuth.uid
  const characterData = doc(db, 'characterData', uid)

  const currCoins = character.coins
  const incCoins = calcCoins(reps)
  const totalCoins = currCoins + incCoins
  const currExp = character.exp
  const incExp = calcExp(reps)
  const totalExp = currExp + incExp

  await setDoc(characterData, {
    coins: totalCoins,
    exp: totalExp,
    health: character.health,
  })

  dispatch(addCoins(incCoins))
  dispatch(addExp(incExp))
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
