import createStore from '../../store'
import { addDude, dudeIdsSelector } from '../../DudeList/interactions'
import {
  addItem, itemIdsSelector,
  updateItemDude, updateItemPrice, updateItemSharedByDudes
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
    store.dispatch(updateItemDude(itemId, dudeId1))
    store.dispatch(updateItemPrice(itemId, 9))

    expect(dudesInDebtSummarySelector(store.getState()).spentAmounts[dudeId1]).toEqual(9)
  })

  it('details how much has been spent on each dude', () => {
    const store = createStore()
    const dudeId1 = addDudeAndReturnId(store, 'dude 1')

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemDude(itemId, dudeId1))
    store.dispatch(updateItemPrice(itemId, 10))

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
    store.dispatch(updateItemDude(itemId, dudeId1))
    store.dispatch(updateItemPrice(itemId, 9))

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
    store.dispatch(updateItemDude(itemId, dudeId1))
    store.dispatch(updateItemSharedByDudes(itemId, [dudeId1, dudeId2]))
    store.dispatch(updateItemPrice(itemId, 9))

    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId1]).toEqual([])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId2]).toEqual([{ dudeId: dudeId1, amount: 4.5 }])
    expect(dudesInDebtSummarySelector(store.getState()).debts[dudeId3]).toEqual([])
  })

  it('gives group total', () => {
    const store = createStore()
    const dude1 = 'dude1'

    store.dispatch(addDude(dude1))

    const itemId1 = addItemAndReturnId(store)
    store.dispatch(updateItemDude(itemId1, dude1))
    store.dispatch(updateItemPrice(itemId1, 9))

    const itemId2 = addItemAndReturnId(store)
    store.dispatch(updateItemDude(itemId2, dude1))
    store.dispatch(updateItemPrice(itemId2, 19))

    expect(dudesInDebtSummarySelector(store.getState()).groupTotal).toEqual(28)
  })
})
