import createStore from '../../store'
import {
  addItem, removeItem, itemIdsSelector,
  lastAddedItemIdSelector,
  updateItemDescription, itemDescriptionSelector,
  updateItemBoughtBy, itemBoughtByDudeIdSelector, itemPriceSelector
} from '../interactions'
import { addDudeAndReturnId } from '../../DudeList/__tests__/DudeListTest.js'

export const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return lastAddedItemIdSelector(store.getState())
}

describe('Item List', () => {
  it('can have items added, optionally with a description, buyer and price', () => {
    const store = createStore()

    store.dispatch(addItem())
    store.dispatch(addItem())
    store.dispatch(addItem('a thing'))

    const itemIds = itemIdsSelector(store.getState())

    expect(itemIds).toHaveLength(3)
    expect(itemDescriptionSelector(store.getState(), itemIds[2])).toEqual('a thing')
  })

  it('can have items removed', () => {
    const store = createStore()
    const itemId1 = addItemAndReturnId(store)
    const itemId2 = addItemAndReturnId(store)
    expect(itemIdsSelector(store.getState())).toHaveLength(2)

    store.dispatch(removeItem(itemId1))
    expect(itemIdsSelector(store.getState())).toHaveLength(1)

    store.dispatch(removeItem(itemId2))
    expect(itemIdsSelector(store.getState())).toHaveLength(0)
  })

  it('can have the description of an item updated', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    store.dispatch(updateItemDescription(itemId, 'a lovely thing'))

    expect(itemDescriptionSelector(store.getState(), itemId)).toEqual('a lovely thing')
  })

  it('can have the dude that bought the item and item price updated', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId = addDudeAndReturnId(store, 'Some dude')

    expect(itemBoughtByDudeIdSelector(store.getState(), itemId)).toEqual(undefined)
    expect(itemPriceSelector(store.getState(), itemId)).toEqual(0)

    store.dispatch(updateItemBoughtBy(itemId, dudeId, 99.99))

    expect(itemBoughtByDudeIdSelector(store.getState(), itemId)).toEqual(dudeId)
    expect(itemPriceSelector(store.getState(), itemId)).toEqual(99.99)
  })

  it('restricts item price to 2dp rounded down', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId = addDudeAndReturnId(store, 'Some dude')

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(0)

    store.dispatch(updateItemBoughtBy(itemId, dudeId, 1.057))

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(1.05)
  })
})
