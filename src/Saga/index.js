import { takeLatest, all } from 'redux-saga/effects'

function * testFunction () {
  console.log('test this')
}

function * actionWatcher () {
  yield takeLatest('TEST_ACTION', testFunction)
}

export default function * rootSaga () {
  yield all([actionWatcher()])
}
