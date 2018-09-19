import createStore from '../../store'
import {
  addItem, removeItem, itemIdsSelector,
  updateItemDescription, itemDescriptionSelector,
  updateItemDude, itemDudeSelector,
  updateItemPrice, itemPriceSelector
} from '../interactions'
import { addDude, removeDude, dudeIdsSelector } from '../../DudeList/interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)
}

describe('Item List', () => {
  it('can have items added', () => {
    const store = createStore()

    expect(itemIdsSelector(store.getState())).toHaveLength(0)

    store.dispatch(addItem())
    store.dispatch(addItem())

    const itemIds = itemIdsSelector(store.getState())

    expect(itemIds).toHaveLength(2)
  })

  it('can have items removed', () => {
    const store = createStore()

    expect(itemIdsSelector(store.getState())).toHaveLength(0)

    const itemId = addItemAndReturnId(store)
    store.dispatch(removeItem(itemId))

    expect(itemIdsSelector(store.getState())).toHaveLength(0)
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

    store.dispatch(addDude('A man'))

    const dudeId = dudeIdsSelector(store.getState())[0]
    store.dispatch(updateItemDude(itemId, dudeId))

    store.dispatch(removeDude(dudeId))

    expect(itemDudeSelector(store.getState(), itemId)).toEqual(undefined)
  })
})
