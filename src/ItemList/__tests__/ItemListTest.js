import createStore from '../../store'
import {
  addDudeAndAssignToItem,
  addItem, removeItem, itemIdsSelector,
  lastAddedItemIdSelector,
  updateItemDescription, itemDescriptionSelector,
  updateItemBoughtBy, itemBoughtByDudeIdSelector, itemPriceSelector
} from '../interactions'
import { addDude, removeDude, dudeIdsSelector, lastAddedDudeSelector } from '../../DudeList/interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return lastAddedItemIdSelector(store.getState())
}

const addDudeAndReturnId = (store, name) => {
  store.dispatch(addDude(name))
  return lastAddedDudeSelector(store.getState())
}

describe('Item List', () => {
  it('initialises with a single item', () => {
    const store = createStore()
    expect(itemIdsSelector(store.getState())).toHaveLength(1)
  })

  it('can have items added', () => {
    const store = createStore()

    store.dispatch(addItem())
    store.dispatch(addItem())

    const itemIds = itemIdsSelector(store.getState())

    expect(itemIds).toHaveLength(3)
  })

  it('can have items removed, but leaves at least one item', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    expect(itemIdsSelector(store.getState())).toHaveLength(2)
    store.dispatch(removeItem(itemId))
    expect(itemIdsSelector(store.getState())).toHaveLength(1)
    store.dispatch(removeItem(itemIdsSelector(store.getState())[0]))
    expect(itemIdsSelector(store.getState())).toHaveLength(1)
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

  it('dissociates a removed dude from any items', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId = addDudeAndReturnId(store, 'A man')

    store.dispatch(updateItemBoughtBy(itemId, dudeId, 100))

    store.dispatch(removeDude(dudeId))

    expect(itemBoughtByDudeIdSelector(store.getState(), itemId)).toEqual(undefined)
  })

  it('can create a new dude and assigns them to the specified item in one go', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    store.dispatch(addDudeAndAssignToItem('A dude', itemId))

    expect(dudeIdsSelector(store.getState())).toHaveLength(1)
    expect(lastAddedDudeSelector(store.getState()))
      .toEqual(itemBoughtByDudeIdSelector(store.getState(), itemId))
  })

  // TODO delete a dude removes them from any shared items OR update UI prevents removal of dude involved with items...
})
