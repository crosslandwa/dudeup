import createStore from '../../store'
import { openModal, modalAddDude, modalItemIdSelector } from '../interactions'
import { lastAddedDudeSelector } from '../../DudeList/interactions'
import { addItem, itemBoughtByDudeIdSelector, itemIdsSelector } from '../../ItemList/interactions'

const addItemAndReturnId = store => {
  store.dispatch(addItem())
  return itemIdsSelector(store.getState()).slice(-1)[0]
}

describe('Add dude modal', () => {
  it('can be opened for a specific item', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    store.dispatch(openModal(itemId))

    expect(modalItemIdSelector(store.getState())).toEqual(itemId)
  })

  it('automatically assigns new dude to (optionally) specified item', () => {
    const store = createStore()
    const itemId = addItemAndReturnId(store)

    store.dispatch(modalAddDude('A dude', itemId))

    expect(lastAddedDudeSelector(store.getState()))
      .toEqual(itemBoughtByDudeIdSelector(store.getState(), itemId))
  })
})
