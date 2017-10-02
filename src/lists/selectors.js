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

// TODO write schema that define these
export function selectCurrentListRecord (state) {
  const id = selectSelectedListId(state)
  return {
    schema: {
      type: 'listRecord',
      version: '1.0.0'
    },
    lastUpdated: Date.now(),
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

export function selectCurrentListSummaryRecord (state) {
  return {
    schema: {
      type: 'listSummaryRecord',
      version: '1.0.0'
    },
    lastUpdated: Date.now(),
    userId: 'local-user', // TODO logged in user?
    lists: selectAllListIds(state).map(id => ({ id, name: selectListName(state, id) }))
  }
}
