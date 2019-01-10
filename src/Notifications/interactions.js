// ------ACTIONS------
export const addNotification = (text, timeoutSeconds = 3) => ({ type: 'NOTIFICATIONS_ADD', notificationType: 'success', text, timeoutSeconds })
export const addWarningNotification = (text, timeoutSeconds = 3) => ({ type: 'NOTIFICATIONS_ADD', notificationType: 'warning', text, timeoutSeconds })
export const removeNotification = () => ({ type: 'NOTIFICATIONS_REMOVE' })

// ------SELECTORS------
export const notificationsSelector = state => state.notifications

// ------REDUCERS------
export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ADD':
      return [{ text: action.text, type: action.notificationType }]
    case 'NOTIFICATIONS_REMOVE':
      return []
  }
  return state
}
