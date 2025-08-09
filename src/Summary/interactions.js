import { dudeIdsSelector } from '../DudeList/interactions'
import {
  itemIdsBoughtByDudeSelector,
  itemPriceSelector,
  itemSharedByDudesSelector
} from '../ItemList/interactions'
import DudeUp from 'dudeup-lib'

const apply = (f, x) => f(x)

// ------SELECTORS------
export const dudesInDebtSummarySelector = state => {
  const dudeIds = dudeIdsSelector(state)
  const dudeUpData = dudeIds.reduce(
    (acc, dudeId) => ({
      ...acc,
      [dudeId]: itemIdsBoughtByDudeSelector(state, dudeId)
        .map(itemId => ({ itemId, sharedByDudes: itemSharedByDudesSelector(state, itemId) }))
        .map(({ itemId, sharedByDudes }) => sharedByDudes.some(({ amount }) => !!amount)
          ? sharedByDudes.map(({ dudeId, amount }) => ({ amount, dudes: [dudeId] }))
          : [{
            amount: itemPriceSelector(state, itemId),
            dudes: apply(
              ids => ids.length ? ids : undefined,
              sharedByDudes.map(({ dudeId }) => dudeId)
            )
          }]
        )
        .reduce((acc, it) => acc.concat(it), [])
    }),
    {}
  )
  const summary = DudeUp(dudeUpData)

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
