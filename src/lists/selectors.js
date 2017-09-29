function selectLists (state) {
  return state.entities.lists
}

function selectListById (state, id) {
  return selectLists(state).byId[id]
}

export function selectAllListIds (state) {
  return selectLists(state).allIds
}

export function selectListName (state, id) {
  return selectListById(state, id).name
}

export function selectSelectedListId (state) {
  return state.selectedListId
}

export function selectAreListsLoading (state) {
  return state.loading.lists
}
