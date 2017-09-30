import { all } from 'redux-saga/effects'

import { fetchListSummarySaga, fetchListRecordSaga } from './lists/sagas'

export default function* rootSaga() {
  yield all([
    fetchListSummarySaga(),
    fetchListRecordSaga()
  ])
}
