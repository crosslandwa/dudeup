import createStore from '../../store'
import {
  addItem, removeItem, itemIdsSelector,
  updateItemCostSplitting, itemCostSplittingSelector,
  updateItemDescription, itemDescriptionSelector,
  updateItemDude, itemDudeSelector,
  updateItemIsUnequalSplit, itemIsUnequalSplitSelector,
  updateItemPrice, itemPriceSelector,
  updateItemSharedByDudes, itemSharedByDudeIdsSelector
} from '../interactions'
import { addDude, removeDude, dudeIdsSelector } from '../../DudeList/interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)[0]
}

const addDudeAndReturnId = (store, name) => {
  store.dispatch(addDude(name))
  return dudeIdsSelector(store.getState()).slice(-1)[0]
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

  it('can have the price of an item updated', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(0)

    store.dispatch(updateItemPrice(itemId, 99.99))

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(99.99)
  })

  it('restricts item price to 2dp rounded down', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(0)

    store.dispatch(updateItemPrice(itemId, 1.057))

    expect(itemPriceSelector(store.getState(), itemId)).toEqual(1.05)
  })

  it('can have the dude that bought an item updated', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId = 'the_lonely_guy'

    expect(itemDudeSelector(store.getState(), itemId)).toEqual(undefined)

    store.dispatch(updateItemDude(itemId, dudeId))

    expect(itemDudeSelector(store.getState(), itemId)).toEqual(dudeId)
  })

  it('dissociates a removed dude from any items', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId = addDudeAndReturnId(store, 'A man')

    store.dispatch(updateItemDude(itemId, dudeId))

    store.dispatch(removeDude(dudeId))

    expect(itemDudeSelector(store.getState(), itemId)).toEqual(undefined)
  })

  it('splits item cost equally between involved dudes by default', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    expect(itemIsUnequalSplitSelector(store.getState(), itemId)).toEqual(false)

    store.dispatch(updateItemIsUnequalSplit(itemId, true))

    expect(itemIsUnequalSplitSelector(store.getState(), itemId)).toEqual(true)
  })

  it('shares item cost equally between all dudes by default', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')

    expect(itemSharedByDudeIdsSelector(store.getState(), itemId)).toEqual([dudeId1, dudeId2])

    const dudeId3 = addDudeAndReturnId(store, 'Third man')
    expect(itemSharedByDudeIdsSelector(store.getState(), itemId)).toEqual([dudeId1, dudeId2, dudeId3])
  })

  it('allows item cost to be shared between specific dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    addDudeAndReturnId(store, 'Another man')

    store.dispatch(updateItemSharedByDudes(itemId, [dudeId1]))

    expect(itemSharedByDudeIdsSelector(store.getState(), itemId)).toEqual([dudeId1])
  })

  it('allows item cost to be split between specific dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')

    store.dispatch(updateItemCostSplitting(itemId, {
      [dudeId1]: 30,
      [dudeId2]: 20
    }))

    expect(itemCostSplittingSelector(store.getState(), itemId)).toEqual({
      [dudeId1]: 30,
      [dudeId2]: 20
    })
  })

  it('does not add newly created dudes to items already shared between specific other dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    store.dispatch(updateItemSharedByDudes(itemId, [dudeId1]))

    addDudeAndReturnId(store, 'Another man')

    expect(itemSharedByDudeIdsSelector(store.getState(), itemId)).toEqual([dudeId1])
  })

  // TODO delete a dude removes them from any shared items OR update UI prevents removal of dude involved with items...
})
