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
    case 'DUDE_NEW':
      return addDude(state, action.listId, action.id)
    case 'DUDE_REMOVE':
      return removeDude(state, action.id)
    default:
      return state
  }
}

function addList (state, id) {
  const updated = clone(state)
  updated.byId[id] = { id, name: 'New list', dudeIds: [] }
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

function addDude (state, listId, dudeId) {
  const updated = clone(state)
  updated.byId[listId].dudeIds = updated.byId[listId].dudeIds.concat(dudeId)
  return updated
}

function removeDude (state, removedDudeId) {
  const updated = clone(state)
  updated.allIds.forEach(id => {
    updated.byId[id].dudeIds = updated.byId[id].dudeIds.filter(dudeId => dudeId !== removedDudeId)
  })
  return updated
}
