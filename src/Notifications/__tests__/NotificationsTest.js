import createStore from '../../store'
import { addNotification, addWarningNotification, notificationsSelector, removeNotification } from '../interactions'

describe('Notifications', () => {
  it('can be added', () => {
    const store = createStore()
    store.dispatch(addNotification('some text'))

    const notifications = notificationsSelector(store.getState())
    expect(notifications).toHaveLength(1)
    expect(notifications[0].text).toEqual('some text')
    expect(notifications[0].type).toEqual('success')
  })

  it('can be added as warnings', () => {
    const store = createStore()
    store.dispatch(addWarningNotification('alert!'))

    const notifications = notificationsSelector(store.getState())
    expect(notifications[0].text).toEqual('alert!')
    expect(notifications[0].type).toEqual('warning')
  })

  it('only the most recent notification is available', () => {
    const store = createStore()
    store.dispatch(addNotification('one'))
    store.dispatch(addNotification('two'))

    const notifications = notificationsSelector(store.getState())
    expect(notifications).toHaveLength(1)
    expect(notifications[0].text).toEqual('two')
  })

  it('can be dismissed', () => {
    const store = createStore()
    store.dispatch(addNotification('one'))
    store.dispatch(removeNotification())

    const notifications = notificationsSelector(store.getState())
    expect(notifications).toHaveLength(0)
  })
})
