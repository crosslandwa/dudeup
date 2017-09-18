import { selectListById } from '../lists/selectors'

function selectDudes (state) {
  return state.entities.dudes
}

function selectDudeById (state, id) {
  return selectDudes(state).byId[id]
}

export function selectAllDudeIds (state) {
  return selectDudes(state).allIds
}

export function selectAllDudeIsForList(state, listId) {
  return selectListById(state, listId).dudeIds
}

export function selectNumberOfDudes (state) {
  return selectDudes(state).allIds.length
}

export function selectDudesName (state, id) {
  return selectDudeById(state,id).name
}

export function selectSelectedDudeId (state) {
  return state.selectedDudeId
}
