import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function selectedListReducer (state = null, action) {
  switch (action.type) {
    case 'LIST_SELECT':
      return action.id
    case 'LIST_REMOVE':
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
    default:
      return state
  }
}

function addList (state, id) {
  const updated = clone(state)
  updated.byId[id] = { id, name: 'New list' }
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
