// ------ACTIONS------
export const addNotification = (text, timeoutSeconds = 3) => ({ type: 'NOTIFICATIONS_ADD', notificationType: 'success', text, timeoutSeconds })
export const addWarningNotification = (text, timeoutSeconds = 3) => ({ type: 'NOTIFICATIONS_ADD', notificationType: 'warning', text, timeoutSeconds })
const removeNotification = id => ({ type: 'NOTIFICATIONS_REMOVE', id })

// ------SELECTORS------
export const notificationIdsSelector = state => state.notifications.allIds
const lastAddedNotificationIdSelctor = state => state.notifications.allIds.slice(-1)[0]
export const notificationTextSelector = (state, id) => state.notifications.byId[id].text
export const notificationTypeSelector = (state, id) => state.notifications.byId[id].type

// ------REDUCERS------
const notification = (state = { text: '' }, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ADD':
      return { ...state, text: action.text, type: action.notificationType }
  }
  return state
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ADD':
      const id = `notification-${(state.allIds.length ? Math.max(...state.allIds.map(x => x.replace('notification-', ''))) : 0) + 1}`
      return {
        allIds: state.allIds.includes(id) ? state.allIds : state.allIds.concat(id),
        byId: {
          ...state.byId,
          [id]: notification(state.byId[id], action)
        }
      }
    case 'NOTIFICATIONS_REMOVE':
      const updatedIds = [...state.allIds]
      updatedIds.splice(state.allIds.indexOf(action.id), 1)
      return {
        allIds: updatedIds,
        byId: { ...state.byId, [action.id]: undefined }
      }
  }
  return state
}

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'NOTIFICATIONS_ADD':
        next(action)
        const id = lastAddedNotificationIdSelctor(store.getState())
        setTimeout(() => {
          next(removeNotification(id))
        }, action.timeoutSeconds * 1000)
        return
    }
    next(action)
  }
}
