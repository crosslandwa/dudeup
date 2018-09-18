import createStore from '../../store'
import {
  addItem, itemIdsSelector,
  updateItemDescription, itemDescriptionSelector,
  updateItemPrice, itemPriceSelector
} from '../interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)
}

describe('Item List', () => {
  it('can have Items added', () => {
    const store = createStore()

    expect(itemIdsSelector(store.getState())).toHaveLength(0)

    store.dispatch(addItem())
    store.dispatch(addItem())

    const itemIds = itemIdsSelector(store.getState())

    expect(itemIds).toHaveLength(2)
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
})
