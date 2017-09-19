import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function selectedDudeReducer (state = null, action) {
  switch (action.type) {
    case 'DUDE_SELECT':
    case 'DUDE_NEW':
      return action.id
    case 'DUDE_REMOVE':
    case 'LIST_SELECT':
    case 'LIST_REMOVE':
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
    case 'LIST_REMOVE':
      return action.dudeIds.reduce((updated, dudeId) => removeDude(updated, dudeId), state)
    default:
      return state
  }
}

function addDude (state, id) {
  const updated = clone(state)
  updated.byId[id] = { id, name: '', dudeIds: [] }
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
