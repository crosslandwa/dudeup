import { addNotification } from '../Notifications/interactions'
import { isDudeInvoledInAnyItemsSelector } from '../ItemList/interactions'

// ------ACTIONS------
export const addDude = (name = 'The other guy') => ({ type: 'DUDELIST_ADD_DUDE', name })
export const removeDude = id => ({ type: 'DUDELIST_REMOVE_DUDE', id })
export const updateDudeName = (id, name) => ({ type: 'DUDELIST_UPDATE_NAME', id, name })

// ------SELECTORS------
export const dudeCanBeRemovedSelector = (state, id) => !isDudeInvoledInAnyItemsSelector(state, id)
export const dudeIdsSelector = state => state.persisted.dudes.allIds
export const dudeNameSelector = (state, id) => state.persisted.dudes.byId[id].name
export const lastAddedDudeSelector = state => dudeIdsSelector(state).slice(-1)[0]

// ------REDUCERS------
const dude = (state = {}, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
    case 'DUDELIST_UPDATE_NAME':
      return { ...state, name: action.name }
  }
  return state
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      const id = `dude-${(state.allIds.length ? Math.max(...state.allIds.map(x => x.replace('dude-', ''))) : 0) + 1}`
      return {
        allIds: state.allIds.includes(id) ? state.allIds : state.allIds.concat(id),
        byId: {
          ...state.byId,
          [id]: dude(state.byId[id], action)
        }
      }
    case 'DUDELIST_REMOVE_DUDE':
      const updatedIds = [...state.allIds]
      updatedIds.splice(state.allIds.indexOf(action.id), 1)
      return {
        allIds: updatedIds,
        byId: { ...state.byId, [action.id]: undefined }
      }
    case 'DUDELIST_UPDATE_NAME':
      return {
        allIds: state.allIds,
        byId: {
          ...state.byId,
          [action.id]: dude(state.byId[action.id], action)
        }
      }
  }
  return state
}

// ------MIDDLEWARE------
export function middleware (store) {
  return (next) => (action) => {
    switch (action.type) {
      case 'DUDELIST_ADD_DUDE':
        next(action)
        next(addNotification(`Added new dude '${action.name}'`))
        return
      case 'DUDELIST_REMOVE_DUDE':
        const name = dudeNameSelector(store.getState(), action.id)
        next(action)
        next(addNotification(`Removed '${name}'`))
        return
    }
    next(action)
  }
}
