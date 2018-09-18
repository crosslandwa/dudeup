import createStore from '../../store'
import { closeModal, openModal, modalIdSelector } from '../interactions'

describe('Modal', () => {
  it('can be opened and closed', () => {
    const store = createStore()
    const modalId = 'modal1'

    expect(modalIdSelector(store.getState())).toEqual(undefined)

    store.dispatch(openModal(modalId))

    expect(modalIdSelector(store.getState())).toEqual(modalId)

    store.dispatch(closeModal())

    expect(modalIdSelector(store.getState())).toEqual(undefined)
  })
})
