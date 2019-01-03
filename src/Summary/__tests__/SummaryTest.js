import createStore from '../../store'
import {
  updateItem,
  shareItemBetweenDudes, splitItemBetweenDudes
} from '../../ItemList/interactions'
import { dudesInDebtSummarySelector } from '../interactions'
import { addDudeAndReturnId } from '../../DudeList/__tests__/DudeListTest.js'
import { addItemAndReturnId } from '../../ItemList/__tests__/ItemListTest.js'

describe('Summary', () => {
  it('details how much each dude has spent', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 9))

    expect(dudesInDebtSummarySelector(store.getState()).spentAmounts[dudeId1]).toEqual(9)
  })

  it('details how much has been spent on each dude', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 10))

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
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 9))

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
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 9))
    store.dispatch(shareItemBetweenDudes(itemId, [dudeId1, dudeId2]))

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toEqual([])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toEqual([{ dudeId: dudeId1, amount: 4.5 }])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId3]).toEqual([])

    store.dispatch(splitItemBetweenDudes(itemId, {
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
    store.dispatch(updateItem(itemId1, 'an item', dudeId1, 9))

    const itemId2 = addItemAndReturnId(store)
    store.dispatch(updateItem(itemId2, 'an item', dudeId1, 19))

    expect(dudesInDebtSummarySelector(store.getState()).groupTotal).toEqual(28)
  })
})
