// We import delay, a utility function that returns a Promise that will resolve after a specified number of milliseconds.
// We'll use this function to block the Generator.
import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// Next, we created another Saga watchIncrementAsync.
// We use takeEvery, a helper function provided by redux-saga,
// to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// Our worker Saga: will perform the async increment task
// So to summarize, the incrementAsync Saga sleeps for 1 second via the call to delay(1000), then dispatches an INCREMENT action.
export function* incrementAsync() {
  // Instead of doing yield delay(1000), we're now doing yield call(delay, 1000). What's the difference?
  // What happens is that the middleware examines the type of each yielded Effect then decides how to fulfill that Effect.
  // If the Effect type is a PUT then it will dispatch an action to the Store.
  // If the Effect is a CALL then it'll call the given function.
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' })
}