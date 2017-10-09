// We import delay, a utility function that returns a Promise that will resolve after a specified number of milliseconds.
// We'll use this function to block the Generator.
import { delay } from 'redux-saga'
import Api from './api';

import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello Sagas!')
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

export function* fetchUser() {
  try
  {
    console.log('in fetch user');
    const data = yield call(Api.fetchUser);
    console.log(data);
    yield put({ type: 'FETCH_SUCCESS', data });
  }
  catch (e)
  {
    yield put({ type: 'FETCH_FAILED', e });
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_ASYNC', fetchUser)
}

// like throttling, gets latest call
function* watchFetchLatesData() {
  yield takeLatest('FETCH_LATEST_ASYNC', fetchUser)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// Next, we created another Saga watchIncrementAsync.
// We use takeEvery, a helper function provided by redux-saga,
// to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start all Sagas at once
// This Saga yields an array with the results of calling our two sagas, helloSaga and watchIncrementAsync
// This means the two resulting Generators will be started in parallel.
// Now we only have to invoke sagaMiddleware.run on the root Saga in main.js
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData(),
    watchFetchLatesData()
  ])
}