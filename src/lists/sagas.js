import { delay } from 'redux-saga'
import { put, select, takeLatest } from 'redux-saga/effects'
import { listSummaryLoaded, loadListRecord, listRecordLoaded } from './actions'
import { selectCurrentListRecord, selectCurrentListSummaryRecord, selectLoggedInUser } from './selectors'

const storageKey = 'dude-up-local-storage'

function fetchRecordSet () {
  let recordSet = window.localStorage.getItem(storageKey)
  return recordSet ? JSON.parse(recordSet) : {}
}

function storeRecord (id, record) {
  const updated = fetchRecordSet()
  updated[id] = record
  window.localStorage.setItem(storageKey, JSON.stringify(updated))
}

function fetchListSummaryRecord (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(fetchRecordSet()[id] || { schema: { type: 'listSummaryRecord', version: '1.0.0' }, lists: [] })
    }, 1000)
  })
}

function fetchListRecord (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(fetchRecordSet()[id] || { schema: { type: 'listRecord', version: '1.0.0' }, list: { id, dudes: [] } })
    }, 1000)
  })
}

export function* fetchListSummarySaga() {
  yield takeLatest('LIST_SUMMARY_LOAD', function* (action) {
    const userId = yield select(selectLoggedInUser)
    const data = yield fetchListSummaryRecord(userId)
    yield put(listSummaryLoaded(data))
  })
}

export function* triggerFetchListRecordSaga () {
  yield takeLatest('LIST_SELECT', function* (action) {
    yield put(loadListRecord(action.id))
  })
}

export function* fetchListRecordSaga () {
  yield takeLatest('LIST_RECORD_LOAD', function* (action) {
    const data = yield fetchListRecord(action.id)
    yield put(listRecordLoaded(data))
  })
}

export function* storeListRecordEditsSaga () {
  yield takeLatest([
      'DUDE_ADD', 'DUDE_UPDATE_NAME', 'DUDE_REMOVE',
      'ITEM_UPDATE_DESCRIPTION', 'ITEM_UPDATE_PRICE', 'ITEM_REMOVE'
    ],
    function* (action) {
      const record = yield select(selectCurrentListRecord)
      yield delay(1000) // debounce rapid edits
      storeRecord(record.list.id, record)
    }
  )
}

export function* storeListSummaryRecordEditsSaga () {
  yield takeLatest(
    ['LIST_ADD', 'LIST_UPDATE_NAME', 'LIST_REMOVE'],
    function* (action) {
      const record = yield select(selectCurrentListSummaryRecord)
      yield delay(1000) // debounce rapid edits
      storeRecord(record.userId, record)
    }
  )
}
