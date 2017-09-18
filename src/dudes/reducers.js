import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function selectedDudeReducer (state = null, action) {
  switch (action.type) {
    case 'DUDE_SELECT':
      return action.id
    case 'DUDE_REMOVE':
    case 'LIST_SELECT':
      return null
    default:
      return state
  }
}

export function dudesReducer (state = initialState, action) {
  switch (action.type) {
    case 'DUDE_NEW':
      return addDude(state, action.id)
    case 'DUDE_UPDATE_NAME':
      return updateName(state, action.id, action.name)
    case 'DUDE_REMOVE':
      return removeDude(state, action.id)
    default:
      return state
  }
}

function addDude (state, id) {
  const updated = clone(state)
  updated.byId[id] = { id, name: '' }
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

function removeDude (state, id) {
  const updated = clone(state)
  delete updated.byId[id]
  updated.allIds = updated.allIds.filter(other => other !== id)
  return updated
}
