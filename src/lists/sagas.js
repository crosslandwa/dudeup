import { delay } from 'redux-saga'
import { put, select, takeLatest } from 'redux-saga/effects'
import { listSummaryLoaded, loadListRecord, listRecordLoaded } from './actions'
import { selectCurrentListRecord } from './selectors'

function fetchListSummary (userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        schemaVersion: '1.0.0',
        lists: [
          { id: 'list-73', name: 'A' },
          { id: 'list-243', name: 'B' }
        ]
      })
    }, 1000)
  })
}

function fetchListRecord (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const raw = window.localStorage.getItem(id)
      return resolve(raw
        ? JSON.parse(raw)
        : { schema: '1.0.0', list: { id, dudes: [] } } // TODO handle error case
      )
    }, 1000)
  })
}

function* loadListSummaryGenerator(action) {
  const data = yield fetchListSummary(action.userId)
  yield put(listSummaryLoaded(data))
}

export function* fetchListSummarySaga() {
  yield takeLatest('LIST_SUMMARY_LOAD', loadListSummaryGenerator)
}

function* loadListRecordGenerator(action) {
  yield put(loadListRecord())
  const data = yield fetchListRecord(action.id)
  yield put(listRecordLoaded(data))
}

export function* fetchListRecordSaga() {
  yield takeLatest('LIST_SELECT', loadListRecordGenerator)
}


function* updateStoredListRecord (action) {
  const record = yield select(selectCurrentListRecord)
  yield delay(1000) // debounce rapid edits
  window.localStorage.setItem(record.list.id, JSON.stringify(record))
}

export function* storeListRecordEditsSaga () {
  yield takeLatest(['LIST_UPDATE_NAME', 'DUDE_UPDATE_NAME'], updateStoredListRecord)
}
