import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsForDudeSelector, itemPriceSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

// ------ACTIONS------

// ------SELECTORS------
const calculateSummary = state => DudeUp(dudeIdsSelector(state)
  .reduce((acc, dudeId) => ({
    ...acc,
    [dudeId]: itemIdsForDudeSelector(state, dudeId).map(itemId => itemPriceSelector(state, itemId))
  }), {}))

export const dudesInDebtIdSelector = state => {
  const summary = calculateSummary(state)
  return Object.keys(summary.amountOwedByGroupMember)
    .filter(dudeId => Object.keys(summary.amountOwedByGroupMember[dudeId]).length)
}

export const debtsForDudeSelector = (state, dudeId) => {
  const owedDudeIdsToAmount = calculateSummary(state).amountOwedByGroupMember[dudeId]
  return Object.keys(owedDudeIdsToAmount).map(dudeId => ({ dudeId, amount: owedDudeIdsToAmount[dudeId] }))
}

// ------REDUCERS------
