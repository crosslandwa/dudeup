import { dudeIdsSelector } from '../DudeList/interactions'
import {
  itemIdsBoughtByDudeSelector,
  itemPriceSelector,
  itemCostSplitSelector,
  isItemExplicitlySplitSelector,
  itemSharedByDudeIdsSelector
} from '../ItemList/interactions'
import DudeUp from 'dudeup'

const apply = (f, x) => f(x)

// ------SELECTORS------
export const dudesInDebtSummarySelector = state => {
  const summary = DudeUp(dudeIdsSelector(state)
    .reduce((acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsBoughtByDudeSelector(state, dudeId).map(itemId => isItemExplicitlySplitSelector(state, itemId)
        ? apply(split => Object.keys(split).map(dudeId => ({ amount: split[dudeId], dudes: [dudeId] })), itemCostSplitSelector(state, itemId))
        : [{ amount: itemPriceSelector(state, itemId), dudes: apply(ids => ids.length ? ids : undefined, itemSharedByDudeIdsSelector(state, itemId)) }]
      ).reduce((acc, it) => acc.concat(it), [])
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
