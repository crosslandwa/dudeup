import createStore from '../../store'
import { addNotification, addWarningNotification, notificationIdsSelector, notificationTextSelector, notificationTypeSelector } from '../interactions'

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
    store.dispatch(addNotification('some text', 0.1))

    expect(notificationIdsSelector(store.getState())).toHaveLength(1)

    setTimeout(() => {
      expect(notificationIdsSelector(store.getState())).toHaveLength(0)
      done()
    }, 200)
  })

  it('can be added as warnings', () => {
    const store = createStore()
    store.dispatch(addWarningNotification('alert!'))

    const ids = notificationIdsSelector(store.getState())
    expect(ids).toHaveLength(1)
    expect(notificationTextSelector(store.getState(), ids[0])).toEqual('alert!')
    expect(notificationTypeSelector(store.getState(), ids[0])).toEqual('warning')
  })
})
