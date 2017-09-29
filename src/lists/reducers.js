import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function listLoadedReduced (state = true, action) {
  switch (action.type) {
    case 'LIST_SUMMARY_LOAD':
      return true
    case 'LIST_SUMMARY_LOADED':
      return false
    default:
      return state
  }
}

export function selectedListReducer (state = null, action) {
  switch (action.type) {
    case 'LIST_ADD':
    case 'LIST_SELECT':
      return action.id
    case 'LIST_REMOVE':
    case 'LIST_SUMMARY_LOADED':
      return null
    default:
      return state
  }
}

export function listsReducer (state = initialState, action) {
  switch (action.type) {
    case 'LIST_ADD':
      return addList(state, action.id)
    case 'LIST_UPDATE_NAME':
      return updateName(state, action.id, action.name)
    case 'LIST_REMOVE':
      return removeList(state, action.id)
    case 'LIST_SUMMARY_LOADED':
      return action.record.lists
        .reduce((updated, { id, name }) => addList(updated, id, name), state)
    default:
      return state
  }
}

function addList (state, id, name = '') {
  const updated = clone(state)
  updated.byId[id] = { id, name }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}

function updateName (state, id, name) {
  const updated = clone(state)
  updated.byId[id].name = name
  return updated
}

function removeList (state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(other => other !== id)
  return updated
}
