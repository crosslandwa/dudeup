import createStore from '../../store'
import {
  addItem, lastAddedItemIdSelector,
  isItemExplicitlySplitSelector, itemSharingLabelSelector,
  shareItemBetweenDudes, splitItemBetweenDudes
} from '../interactions'
import { addDude, lastAddedDudeSelector } from '../../DudeList/interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return lastAddedItemIdSelector(store.getState())
}

const addDudeAndReturnId = (store, name) => {
  store.dispatch(addDude(name))
  return lastAddedDudeSelector(store.getState())
}

describe('Item sharing', () => {
  it('item is shared by all dudes by default', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    addDudeAndReturnId(store, 'A man')
    addDudeAndReturnId(store, 'Another man')

    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Shared by everyone')
    expect(isItemExplicitlySplitSelector(store.getState(), itemId)).toEqual(false)
  })

  it('item can be shared by sub-set of dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')
    addDudeAndReturnId(store, 'Third man')

    store.dispatch(shareItemBetweenDudes(itemId, [dudeId1, dudeId2]))

    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Shared by A man, Another man')
    expect(isItemExplicitlySplitSelector(store.getState(), itemId)).toEqual(false)
  })

  it('item can be explicitly split between dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    const dudeId2 = addDudeAndReturnId(store, 'Another man')
    addDudeAndReturnId(store, 'Third man')

    store.dispatch(splitItemBetweenDudes(itemId, { [dudeId1]: 10, [dudeId2]: 20 }))

    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Split between A man(10.00), Another man(20.00)')
    expect(isItemExplicitlySplitSelector(store.getState(), itemId)).toEqual(true)
  })

  it('does not add newly created dudes to items already shared/split between specific other dudes', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)
    const dudeId1 = addDudeAndReturnId(store, 'A man')
    store.dispatch(splitItemBetweenDudes(itemId, { [dudeId1]: 100 }))

    const dudeId2 = addDudeAndReturnId(store, 'Another man')

    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Split between A man(100.00)')

    store.dispatch(shareItemBetweenDudes(itemId, [dudeId1, dudeId2]))
    addDudeAndReturnId(store, 'Third man man')
    expect(itemSharingLabelSelector(store.getState(), itemId)).toEqual('Shared by A man, Another man')
  })
})
