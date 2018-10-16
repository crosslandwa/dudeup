import createStore from '../../store'
import { addNotification, notificationIdsSelector, notificationTextSelector } from '../interactions'

describe('Notifications', () => {
  it('can be added', () => {
    const store = createStore()
    store.dispatch(addNotification('some text'))

    const ids = notificationIdsSelector(store.getState())
    expect(ids).toHaveLength(1)
    expect(notificationTextSelector(store.getState(), ids[0])).toEqual('some text')
  })

  it('are automatically removed after a specified timeout (defaults to 4s)', done => {
    const store = createStore()
    store.dispatch(addNotification(0.1))

    expect(notificationIdsSelector(store.getState())).toHaveLength(1)

    setTimeout(() => {
      expect(notificationIdsSelector(store.getState())).toHaveLength(0)
      done()
    }, 0.2)
  })
})
