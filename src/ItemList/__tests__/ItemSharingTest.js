import createStore from '../../store'
import {
  itemSharedByDudesSelector,
  itemSharingLabelSelector,
  updateItem
} from '../interactions'
import { addDudeAndReturnId } from '../../DudeList/__tests__/DudeListTest.js'
import { addItemAndReturnId } from './ItemListTest.js'

describe('Item sharing', () => {
  it('item is shared by all dudes by default', () => {
    const store = createStore()
    const { getState } = store
    const itemId = addItemAndReturnId(store)
    addDudeAndReturnId(store, 'A man')
    addDudeAndReturnId(store, 'Another man')

    expect(itemSharingLabelSelector(getState(), itemId)).toEqual('')
    expect(itemSharedByDudesSelector(getState(), itemId)).toEqual([])
  })

  it('item can be shared by sub-set of dudes', () => {
    const store = createStore()
    const { dispatch, getState } = store
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')
    addDudeAndReturnId(store, 'Third man')

    dispatch(updateItem(itemId, 'an item', dudeId1, 1.99, [{ dudeId: dudeId1 }, { dudeId: dudeId2 }]))

    expect(itemSharingLabelSelector(getState(), itemId)).toEqual('Split between A man, Another man')
    expect(itemSharedByDudesSelector(getState(), itemId)).toEqual([
      { dudeId: dudeId1 },
      { dudeId: dudeId2 }
    ])
  })

  it('item can be explicitly split between dudes', () => {
    const store = createStore()
    const { dispatch, getState } = store
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')
    addDudeAndReturnId(store, 'Third man')

    dispatch(updateItem(itemId, 'an item', dudeId1, 30, [ { dudeId: dudeId1, amount: 10 }, { dudeId: dudeId2, amount: 20 } ]))

    expect(itemSharingLabelSelector(getState(), itemId)).toEqual('A man (10.00), Another man (20.00)')
    expect(itemSharedByDudesSelector(getState(), itemId)).toEqual([
      { dudeId: dudeId1, amount: 10 },
      { dudeId: dudeId2, amount: 20 }
    ])
  })

  it('does not add newly created dudes to items already shared/split between specific other dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    store.dispatch(updateItem(itemId, 'an item', dudeId1, 100, [{ dudeId: dudeId1, amount: 100 }]))

    const dudeId2 = addDudeAndReturnId(store, 'Another man')

    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('A man (100.00)')

    store.dispatch(updateItem(itemId, 'an item', dudeId1, 1.99, [{ dudeId: dudeId1 }, { dudeId: dudeId2 }]))
    addDudeAndReturnId(store, 'Third man man')
    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Split between A man, Another man')
  })
})
