// We import delay, a utility function that returns a Promise that will resolve after a specified number of milliseconds.
// We'll use this function to block the Generator.
import { delay } from 'redux-saga'

import { put, takeEvery } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
// So to summarize, the incrementAsync Saga sleeps for 1 second via the call to delay(1000), then dispatches an INCREMENT action.
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// Next, we created another Saga watchIncrementAsync.
// We use takeEvery, a helper function provided by redux-saga,
// to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}