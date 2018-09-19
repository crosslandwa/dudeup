import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsForDudeSelector, itemPriceSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

// ------ACTIONS------

// ------SELECTORS------
export const dudesInDebtIdSelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsForDudeSelector(state, dudeId).map(itemId => itemPriceSelector(state, itemId))
    }), {}))

  return Object.keys(summary.amountOwedByGroupMember)
    .filter(dudeId => Object.keys(summary.amountOwedByGroupMember[dudeId]).length)
}

// ------REDUCERS------
