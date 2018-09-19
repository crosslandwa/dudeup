import createStore from '../../store'
import { addDude } from '../../DudeList/interactions'
import { addItem, updateItemDude, updateItemPrice, itemIdsSelector } from '../../ItemList/interactions'
import { debtsForDudeSelector, dudesInDebtIdSelector } from '../interactions'

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

    expect(dudesInDebtIdSelector(store.getState())).toHaveLength(0)
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

    expect(dudesInDebtIdSelector(store.getState())).toHaveLength(2)

    expect(debtsForDudeSelector(store.getState(), dude2)).toEqual([{ dudeId: 'dude1', amount: 3 }])
  })
})
