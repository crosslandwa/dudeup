import createStore from '../../store'
import { addDude, dudeIdsSelector } from '../../DudeList/interactions'
import {
  addItem, itemIdsSelector,
  updateItemBoughtBy, updateItemCostSplitting
} from '../../ItemList/interactions'
import { dudesInDebtSummarySelector } from '../interactions'

const addDudeAndReturnId = (store, name) => {
  store.dispatch(addDude(name))
  return dudeIdsSelector(store.getState()).slice(-1)[0]
}

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)[0]
}

describe('Summary', () => {
  it('details how much each dude has spent', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId, dudeId1, 9))

    expect(dudesInDebtSummarySelector(store.getState()).spentAmounts[dudeId1]).toEqual(9)
  })

  it('details how much has been spent on each dude', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId, dudeId1, 10))

    expect(dudesInDebtSummarySelector(store.getState()).spentOnAmounts[dudeId1]).toEqual(10)
  })

  it('shows no debts when everyone is square', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')
    const dudeId2 = addDudeAndReturnId(store, 'dude 2')

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toHaveLength(0)
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toHaveLength(0)
  })

  it('lists amounts owed when shared items have been bought', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')
    const dudeId2 = addDudeAndReturnId(store, 'dude 2')
    const dudeId3 = addDudeAndReturnId(store, 'dude 3')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId, dudeId1, 9))

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toEqual([])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toEqual([{ dudeId: dudeId1, amount: 3 }])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId3]).toEqual([{ dudeId: dudeId1, amount: 3 }])
  })

  it('lists amount owed when items are shared between some but not all group members', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')
    const dudeId2 = addDudeAndReturnId(store, 'dude 2')
    const dudeId3 = addDudeAndReturnId(store, 'dude 3')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId, dudeId1, 9))
    store.dispatch(updateItemCostSplitting(itemId, {
      [dudeId1]: 4.5,
      [dudeId2]: 4.5
    }))

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toEqual([])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toEqual([{ dudeId: dudeId1, amount: 4.5 }])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId3]).toEqual([])

    store.dispatch(updateItemCostSplitting(itemId, {
      [dudeId1]: 3,
      [dudeId2]: 6
    }))

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toEqual([])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toEqual([{ dudeId: dudeId1, amount: 6 }])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId3]).toEqual([])
  })

  it('gives group total', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId1 = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId1, dudeId1, 9))

    const itemId2 = addItemAndReturnId(store)
    store.dispatch(updateItemBoughtBy(itemId2, dudeId1, 19))

    expect(dudesInDebtSummarySelector(store.getState()).groupTotal).toEqual(28)
  })
})
