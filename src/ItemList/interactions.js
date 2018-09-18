import { combineReducers } from 'redux'

// ------ACTIONS------
export const addItem = () => ({ type: 'ITEMLIST_ADD_ITEM' })
export const updateItemDescription = (id, description) => ({ type: 'ITEMLIST_UPDATE_ITEM_DESCRIPTION', id, description })

// ------SELECTORS------
export const itemIdsSelector = state => state.persisted.items.allIds
export const itemDescriptionSelector = (state, id) => state.persisted.items.byId[id].description

// ------REDUCERS------
const item = (state = { description: '' }, action) => {
  switch (action.type) {
    case 'ITEMLIST_UPDATE_ITEM_DESCRIPTION':
      return { ...state, description: action.description }
  }
  return state
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'ITEMLIST_ADD_ITEM':
      const id = (state.allIds.length ? Math.max(...state.allIds) : 0) + 1
      return {
        ...state,
        allIds: state.allIds.concat(state.allIds.includes(id) ? [] : id),
        byId: { ...state.byId, [id]: item(state.byId[id], action) }
      }
  }
  return action.id
    ? { ...state, byId: { ...state.byId, [action.id]: item(state.byId[action.id], action)} }
    : state
}
