import createStore from '../../store'
import {
  addDeleteNotification,
  addNotification,
  addWarningNotification,
  notificationsSelector,
  removeNotification
} from '../interactions'
import { openAccordian } from '../../Accordian/interactions'

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

  it('can be added as "delete" notifications', () => {
    const { dispatch, getState } = createStore()
    dispatch(addDeleteNotification('removed something'))

    const notifications = notificationsSelector(getState())
    expect(notifications[0].text).toEqual('removed something')
    expect(notifications[0].type).toEqual('delete')
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

  it('are cleared when an accordian is opened', () => {
    const { dispatch, getState } = createStore()

    dispatch(addNotification('one'))
    expect(notificationsSelector(getState())).toHaveLength(1)

    dispatch(openAccordian('anAccordian'))
    expect(notificationsSelector(getState())).toHaveLength(0)
  })
})
