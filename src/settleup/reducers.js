import { clone } from '../reducers'
import SettleUp from 'settleup'

const initialState = {}

export function settleUpReducer (state = initialState, action) {
  return state
}

export function settleUpCalculationsReducer (state, action) {
  // settle up on every action for now.
  // TODO optimise by only settling up at start, and on price update, add dude, etc
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
