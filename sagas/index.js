import { all } from 'redux-saga/effects'

import { helloSaga } from './helloSaga';
import { watchIncrementAsync } from './incrementAsync';
import { watchFetchData, watchFetchLatesData } from './fetchUser';
import { watchAndLog, watchFirstNActions } from './watchAndLog';

// single entry point to start all Sagas at once
// This Saga yields an array with the results of calling our two sagas, helloSaga and watchIncrementAsync
// This means the two resulting Generators will be started in parallel.
// Now we only have to invoke sagaMiddleware.run on the root Saga in main.js
export default function* rootSaga() {
  yield all([
    watchAndLog(),
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData(),
    watchFetchLatesData(),
    watchFirstNActions()
  ])
}