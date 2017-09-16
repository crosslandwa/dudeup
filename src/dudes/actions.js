import { uniqueId } from '../reducers'

export function addDude () {
  return { type: 'DUDE_NEW', id: uniqueId('dude') }
}

export function selectDude (id) {
  return { type: 'DUDE_SELECT', id}
}

export function updateDudeName (id, name) {
  return { type: 'DUDE_UPDATE_NAME', id, name}
}

export function removeDude (id) {
  return { type: 'DUDE_REMOVE', id }
}
