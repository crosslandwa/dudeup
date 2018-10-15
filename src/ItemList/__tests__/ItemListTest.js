import createStore from '../../store'
import {
  addDudeAndAssignToItem,
  addItem, removeItem, itemIdsSelector,
  lastAddedItemIdSelector,
  updateItemCostSplitting, itemCostSplittingSelector, itemIsEqualSplitSelector,
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

  it('shares item cost equally between all dudes by default', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    addDudeAndReturnId(store, 'A man')
    addDudeAndReturnId(store, 'Another man')

    expect(Object.keys(itemCostSplittingSelector(store.getState(), itemId))).toHaveLength(0)

    addDudeAndReturnId(store, 'Third man')
    expect(Object.keys(itemCostSplittingSelector(store.getState(), itemId))).toHaveLength(0)
  })

  it('allows item cost to be split between specific dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')
    addDudeAndReturnId(store, 'Third man, not involved')

    store.dispatch(updateItemCostSplitting(itemId, {
      [dudeId1]: 25,
      [dudeId2]: 25
    }))
    expect(itemIsEqualSplitSelector(store.getState(), itemId)).toEqual(true)

    store.dispatch(updateItemCostSplitting(itemId, {
      [dudeId1]: 30,
      [dudeId2]: 20
    }))

    expect(itemCostSplittingSelector(store.getState(), itemId)).toEqual({
      [dudeId1]: 30,
      [dudeId2]: 20
    })
    expect(itemIsEqualSplitSelector(store.getState(), itemId)).toEqual(false)
  })

  it('does not add newly created dudes to items already shared between specific other dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    store.dispatch(updateItemCostSplitting(itemId, { [dudeId1]: 100 }))

    addDudeAndReturnId(store, 'Another man')

    expect(Object.keys(itemCostSplittingSelector(store.getState(), itemId))).toEqual([dudeId1])
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
