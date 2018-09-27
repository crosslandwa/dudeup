import createStore from '../../store'
import { openModal, modalItemIdSelector } from '../interactions'

describe('Split cost modal', () => {
  it('can be opened for a specific item', () => {
    const store = createStore()
    const itemId = 'my-item'

    store.dispatch(openModal(itemId))

    expect(modalItemIdSelector(store.getState())).toEqual(itemId)
  })
})
