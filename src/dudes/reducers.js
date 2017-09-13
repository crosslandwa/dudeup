import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

export function selectedDudeReducer (state = null, action) {
  switch (action.type) {
    case 'DUDE_SELECT':
      return action.id
  }
  return state
}

export function dudesReducer (state = initialState, action) {
  switch (action.type) {
    case 'DUDE_NEW':
      return addDude(state, action.id)
    case 'DUDE_UPDATE_NAME':
      return updateName(state, action.id, action.name)
  }
  return state
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
