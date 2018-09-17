import { combineReducers } from 'redux'

// ------ACTIONS------
export const addDude = name => ({ type: 'DUDELIST_ADD_DUDE', id: name.toLowerCase().replace('/s+/g', '_'), name })

// ------SELECTORS------
export const dudeIdsSelector = state => state.persisted.dudes.allIds
export const dudeNameSelector = (state, id) => state.persisted.dudes.byId[id].name

// ------REDUCERS------
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      return state.includes(action.id) ? state : state.concat(action.id)
  }
  return state
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      return { ...state, [action.id]: dude(state[action.id], action) }
  }
  return state
}

const dude = (state = {}, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      return { ...state, name: action.name }
  }
  return state
}

export const reducer = combineReducers({ allIds, byId })
