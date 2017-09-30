import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import { dudesReducer, selectedDudeReducer } from './dudes/reducers'
import { itemsReducer } from './items/reducers'
import { settleUpReducer, settleUpCalculationsReducer } from './settleup/reducers'
import {
  listsReducer,
  listLoadedReduced,
  listRecordLoadedReduced,
  selectedListReducer
} from './lists/reducers'

export function uniqueId (prefix) {
  // TODO UUID or something more guaranteed not to clash
  return `${prefix}-${Math.floor((Math.random() * 10000) + 1)}`
}

export function clone (x) {
  return JSON.parse(JSON.stringify(x))
}

export default reduceReducers(
  combineReducers({
    selectedDudeId: selectedDudeReducer,
    selectedListId: selectedListReducer,
    loading: combineReducers({
      lists: listLoadedReduced,
      listRecord: listRecordLoadedReduced
    }),
    settleUp: settleUpReducer,
    entities: combineReducers({
      dudes: dudesReducer,
      items: itemsReducer,
      lists: listsReducer
    })
  }),
  settleUpCalculationsReducer
)
