import createStore from '../../store'
import { addDude } from '../../DudeList/interactions'
import { addItem, updateItemDude, updateItemPrice, itemIdsSelector } from '../../ItemList/interactions'
import { dudesInDebtSummarySelector } from '../interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)
}

describe('Summary', () => {
  it('is empty when everyone is square', () => {
    const store = createStore()
    const dude1 = 'dude1'
    const dude2 = 'dude2'

    store.dispatch(addDude(dude1))
    store.dispatch(addDude(dude2))

    expect(dudesInDebtSummarySelector(store.getState()).dudeIds).toHaveLength(0)
  })

  it('lists amounts owed when shared items have been bought', () => {
    const store = createStore()
    const dude1 = 'dude1'
    const dude2 = 'dude2'
    const dude3 = 'dude3'

    store.dispatch(addDude(dude1))
    store.dispatch(addDude(dude2))
    store.dispatch(addDude(dude3))

    const itemId = addItemAndReturnId(store)
    store.dispatch(updateItemDude(itemId, dude1))
    store.dispatch(updateItemPrice(itemId, 9))

    expect(dudesInDebtSummarySelector(store.getState()).dudeIds).toHaveLength(2)

    expect(dudesInDebtSummarySelector(store.getState()).debts[dude2]).toEqual([{ dudeId: 'dude1', amount: 3 }])
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
