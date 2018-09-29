import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsForDudeSelector, itemPriceSelector, itemSharedByDudeIdsSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

// ------SELECTORS------

export const dudesInDebtSummarySelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsForDudeSelector(state, dudeId).map(itemId => ({
        amount: itemPriceSelector(state, itemId),
        dudes: itemSharedByDudeIdsSelector(state, itemId)
      }))
    }), {}))
  const dudeIds = dudeIdsSelector(state)

  return {
    dudeIds,
    debts: dudeIds.reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: Object.keys(summary.amountOwedByGroupMember[dudeId])
        .map(owesToDudeId => ({
          dudeId: owesToDudeId,
          amount: summary.amountOwedByGroupMember[dudeId][owesToDudeId]
        }))
    }), {}),
    groupTotal: summary.groupTotal,
    spentAmounts: summary.totalPaidPerGroupMember,
    spentOnAmounts: summary.totalSpentOnGroupMember
  }
}
