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
