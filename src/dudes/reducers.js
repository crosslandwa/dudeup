import { clone } from '../reducers'

const initialState = {
  byId: {},
  allIds: []
}

const initialDudeState = {
  byId: {
    a: { id: 'a', name: 'WillyC' },
    b: { id: 'b', name: 'Su' },
    c: { id: 'c', name: 'JonnyJonJon' },
  },
  allIds: ['a', 'b', 'c']
}

export function selectedDudeReducer (state = null, action) {
  switch (action.type) {
    case 'DUDE_SELECT':
      return action.id
  }
  return state
}

export function dudesReducer (state = initialDudeState, action) {
  switch (action.type) {
  }
  return state
}

function addDude (state, id, name) {
  const updated = clone(state)
  updated.byId[id] = { id, name }
  if (!updated.allIds.includes(id)) {
    updated.allIds = updated.allIds.concat(id)
  }
  return updated
}
