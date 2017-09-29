import { delay } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'
import { selectNormalisedList } from './selectors'
import { listSummaryLoaded } from './actions'

function* loadListSummaryGenerator(action) {
  yield delay(1000)
  yield put(listSummaryLoaded())
}

export function* fetchListSummarySaga() {
  yield takeLatest('LIST_SUMMARY_LOAD', loadListSummaryGenerator)
}
