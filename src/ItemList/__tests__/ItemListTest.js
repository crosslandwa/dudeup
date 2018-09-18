import createStore from '../../store'
import {
  addItem, itemIdsSelector,
  updateItemDescription, itemDescriptionSelector
} from '../interactions'

describe('Item List', () => {
  it('can have Items added', () => {
    const store = createStore(false)

    expect(itemIdsSelector(store.getState())).toHaveLength(0)

    store.dispatch(addItem())
    store.dispatch(addItem())

    const itemIds = itemIdsSelector(store.getState())

    expect(itemIds).toHaveLength(2)
  })

  it('can have the description of an item updated', () => {
    const store = createStore(false)

    store.dispatch(addItem())
    store.dispatch(addItem())

    const lastCreatedItemId = itemIdsSelector(store.getState()).slice(-1)

    store.dispatch(updateItemDescription(lastCreatedItemId, 'a lovely thing'))

    expect(itemDescriptionSelector(store.getState(), lastCreatedItemId)).toEqual('a lovely thing')
  })
})
