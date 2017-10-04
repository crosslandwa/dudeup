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

export function loadListsSummary () {
  return { type: 'LIST_SUMMARY_LOAD' }
}

export function listSummaryLoaded (record) {
  return { type: 'LIST_SUMMARY_LOADED', record }
}

export function loadListRecord (id) {
  return { type: 'LIST_RECORD_LOAD', id }
}

export function listRecordLoaded (record) {
  return { type: 'LIST_RECORD_LOADED', record }
}
