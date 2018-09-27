import createStore from '../../store'
import { closeModal, openModal, isModalOpenSelector } from '../interactions'

describe('Modal', () => {
  it('can be opened and closed', () => {
    const store = createStore()
    const modalId = 'modal1'

    expect(isModalOpenSelector(store.getState(), modalId)).toEqual(false)

    store.dispatch(openModal(modalId))

    expect(isModalOpenSelector(store.getState(), modalId)).toEqual(true)

    store.dispatch(closeModal())

    expect(isModalOpenSelector(store.getState(), modalId)).toEqual(false)
  })
})
