// ------ACTIONS------
export const addDude = (name = 'The other guy') => ({ type: 'DUDELIST_ADD_DUDE', id: name.toLowerCase().replace(/\s+/g, '_'), name })
export const removeDude = id => ({ type: 'DUDELIST_REMOVE_DUDE', id })

// ------SELECTORS------
export const dudeIdsSelector = state => state.persisted.dudes.allIds
export const dudeNameSelector = (state, id) => state.persisted.dudes.byId[id].name

// ------REDUCERS------
const dude = (state = {}, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      return { ...state, name: action.name }
  }
  return state
}

export const reducer = (state = { allIds: [], byId: {} }, action) => {
  switch (action.type) {
    case 'DUDELIST_ADD_DUDE':
      return {
        allIds: state.allIds.includes(action.id) ? state.allIds : state.allIds.concat(action.id),
        byId: {
          ...state.byId,
          [action.id]: dude(state[action.id], action)
        }
      }
    case 'DUDELIST_REMOVE_DUDE':
      const updatedIds = [...state.allIds]
      updatedIds.splice(state.allIds.indexOf(action.id), 1)
      return {
        allIds: updatedIds,
        byId: { ...state.byId, [action.id]: undefined }
      }
  }
  return state
}
