import { selectAllDudeIds, selectDudesName } from '../dudes/selectors'
import { selectItemIdsForDude, selectItemDescription, selectItemPrice } from '../items/selectors'

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

export function selectIsListRecordLoading (state) {
  return state.loading.listRecord
}

// TODO write schema that defines this
export function selectCurrentListRecord (state) {
  const id = selectSelectedListId(state)
  return {
    schemaVersion: '1.0.0',
    list: {
      id,
      dudes: selectAllDudeIds(state, id).map(dudeId => ({
        id: dudeId,
        name: selectDudesName(state, dudeId),
        items: selectItemIdsForDude(state, dudeId).map(itemId => ({
          id: itemId,
          description: selectItemDescription(state, itemId),
          price: selectItemPrice(state, itemId)
        }))
      }))
    }
  }
}
