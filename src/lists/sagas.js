import { put, takeLatest } from 'redux-saga/effects'
import { listSummaryLoaded, loadListRecord, listRecordLoaded } from './actions'

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

function* loadListSummaryGenerator(action) {
  const data = yield fetchListSummary(action.userId)
  yield put(listSummaryLoaded(data))
}

export function* fetchListSummarySaga() {
  yield takeLatest('LIST_SUMMARY_LOAD', loadListSummaryGenerator)
}

function* loadListRecordGenerator(action) {
  yield put(loadListRecord())
  const data = yield fetchListSummary(action.id) // use this now as a cheap 1s delay
  yield put(listRecordLoaded(data))
}

export function* fetchListRecordSaga() {
  yield takeLatest('LIST_SELECT', loadListRecordGenerator)
}
