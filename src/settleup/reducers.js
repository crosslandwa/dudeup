import { clone } from '../reducers'
import SettleUp from 'settleup'

const initialState = {}
const actionsThatDoNotAffectPrices = [
  'DUDE_UPDATE_NAME',
  'ITEM_UPDATE_DESCRIPTION',
  'LIST_ADD',
  'LIST_UPDATE_NAME'
]

export function settleUpReducer (state = initialState, action) {
  return state
}

export function settleUpCalculationsReducer (state, action) {
  if (actionsThatDoNotAffectPrices.includes(action.type)) return state

  const formatted = state.entities.dudes.allIds.reduce((acc, dudeId) => {
    acc[dudeId] = state.entities.items.allIds
      .map(itemId => state.entities.items.byId[itemId])
      .filter(item => item.dudeId === dudeId)
      .reduce((amountAcc, item) => {
        amountAcc[item.id] = item.price
        return amountAcc
      }, {})
    return acc
  }, {})

  const updated = clone(state)
  updated.settleUp = SettleUp(formatted).amountOwedByGroupMember

  return updated
}
