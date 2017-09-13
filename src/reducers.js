import { combineReducers } from 'redux'
import { dudesReducer, selectedDudeReducer } from './dudes/reducers'
import { itemsReducer } from './items/reducers'

export function uniqueId (prefix) {
  // TODO UUID or something more guaranteed not to clash
  return `${prefix}-${Math.floor((Math.random() * 10000) + 1)}`
}

export function clone (x) {
  return JSON.parse(JSON.stringify(x))
}

export default combineReducers({
  selectedDudeId: selectedDudeReducer,
  entities: combineReducers({
    dudes: dudesReducer,
    items: itemsReducer
  })
})
