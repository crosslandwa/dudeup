import { all } from 'redux-saga/effects'

import { fetchListSummarySaga } from './lists/sagas'

export default function* rootSaga() {
  yield all([
    fetchListSummarySaga()
  ])
}
