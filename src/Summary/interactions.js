import { dudeIdsSelector } from '../DudeList/interactions'
import { itemIdsForDudeSelector, itemPriceSelector, itemCostSplittingSelector } from '../ItemList/interactions'
import DudeUp from 'dudeup'

const apply = (f, x) => f(x)

// ------SELECTORS------

export const dudesInDebtSummarySelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsForDudeSelector(state, dudeId).map(itemId => ({
        amount: itemPriceSelector(state, itemId),
        dudes: apply(dudeIds => dudeIds.length ? dudeIds : undefined, Object.keys(itemCostSplittingSelector(state, itemId)))
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
