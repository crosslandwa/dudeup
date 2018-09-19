import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsForDudeSelector, itemPriceSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

// ------ACTIONS------

// ------SELECTORS------

export const dudesInDebtSummarySelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsForDudeSelector(state, dudeId).map(itemId => itemPriceSelector(state, itemId))
    }), {}))

  const dudeIds = Object.keys(summary.amountOwedByGroupMember)
    .filter(dudeId => Object.keys(summary.amountOwedByGroupMember[dudeId]).length)

  return {
    averageAmountPerDude: summary.averageAmountPerGroupMember,
    dudeIds,
    debts: dudeIds.reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: Object.keys(summary.amountOwedByGroupMember[dudeId])
        .map(owesToDudeId => ({ dudeId: owesToDudeId, amount: summary.amountOwedByGroupMember[dudeId][owesToDudeId] }))
    }), {}),
    groupTotal: summary.groupTotal
  }
}

// ------REDUCERS------
