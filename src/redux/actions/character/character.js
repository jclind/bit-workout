import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { itemList } from '../../../assets/data/itemList'
import { db } from '../../../firebase'
import {
  DEC_COINS,
  DEC_EXP,
  FETCH_CHARACTER_DATA,
  INC_COINS,
  INC_EXP,
  UPDATE_INVENTORY,
} from '../../types'

export const fetchCharacterData = uid => async dispatch => {
  const characterDataRef = doc(db, 'characterData', uid)
  const characterDoc = await getDoc(characterDataRef)
  let characterData = characterDoc.data()
  if (!characterDoc.exists()) {
    const characterInitialState = {
      coins: 0,
      exp: 0,
      health: 0,
    }
    characterData = characterInitialState
    await setDoc(characterDataRef, characterInitialState)
  }
  dispatch({ type: FETCH_CHARACTER_DATA, payload: characterData })
}

export const calcCoins = (reps, isWarmup) => {
  const coins = reps * 0.5
  if (isWarmup) return Math.ceil(coins / 2)
  return Math.ceil(coins)
}
export const calcExp = (reps, isWarmup) => {
  const exp = reps * 0.8
  if (isWarmup) return Math.ceil(exp / 2)
  return Math.ceil(exp)
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

export const updateCoins = numCoins => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const currCoins = getState().character.coins

  if (numCoins >= 0) {
    dispatch(addCoins(numCoins))
  } else {
    dispatch(removeCoins(numCoins))
  }

  const characterData = doc(db, 'characterData', uid)
  updateDoc(characterData, {
    coins: currCoins + numCoins,
  })
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

export const purchaseShopItem = id => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const purchasedItem = itemList.find(item => item.id === id)
  const purchasedItemCategory = purchasedItem.category
  const itemCost = purchasedItem.cost

  const characterRef = doc(db, 'characterData', uid)
  let characterData = await getDoc(characterRef)
  if (!characterData.exists() || characterData.data().coins < itemCost) {
    return { error: 'Insufficient Coins' }
  }

  const updatedInventoryState =
    getState().character.inventory[purchasedItemCategory]?.length > 0
      ? [...getState().character?.inventory[purchasedItemCategory], id]
      : [id]

  dispatch({
    type: UPDATE_INVENTORY,
    payload: updatedInventoryState,
  })
  dispatch({
    type: DEC_COINS,
    payload: itemCost,
  })

  await setDoc(
    characterRef,
    {
      coins: increment(-itemCost),
      inventory: arrayUnion(id),
    },
    { merge: true }
  )
}
