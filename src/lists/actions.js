import { uniqueId } from '../reducers'

export function addList () {
  return { type: 'LIST_ADD', id: uniqueId('list') }
}

export function selectList (id) {
  return { type: 'LIST_SELECT', id}
}

export function updateListName (id, name) {
  return { type: 'LIST_UPDATE_NAME', id, name}
}

export function removeList (id) {
  return { type: 'LIST_REMOVE', id }
}

export function loadListsSummary (userId) {
  return { type: 'LIST_SUMMARY_LOAD', userId }
}

export function listSummaryLoaded () {
  return { type: 'LIST_SUMMARY_LOADED' }
}
