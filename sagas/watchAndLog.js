// https://redux-saga.js.org/docs/advanced/FutureActions.html

import { select, takeEvery, take, put } from 'redux-saga/effects'

// export function* watchAndLog() {
//   yield takeEvery('*', function* logger(action) {
//     const state = yield select();
//
//     console.log('action', action);
//     console.log('state after', state)
//   })
// }

// the same, using take
// The take is just like call and put we saw earlier.
// It creates another command object that tells the middleware to wait for a specific action.
// The resulting behavior of the call Effect is the same as when the middleware suspends the Generator until a Promise resolves.
// In the take case it'll suspend the Generator until a matching action is dispatched.
// In the above example watchAndLog is suspended until any action is dispatched.
//
// Note how we're running an endless loop while (true).
// Remember this is a Generator function, which doesn't have a run-to-completion behavior.
// Our Generator will block on each iteration waiting for an action to happen.
//
// Using take has a subtle impact on how we write our code.
// In the case of takeEvery the invoked tasks have no control on when they'll be called.
// They will be invoked again and again on each matching action.
// They also have no control on when to stop the observation.
export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();

    console.log('action', action);
    console.log('state after', state)
  }
}

export function* watchFirstNActions() {
  const maxToWatch = 5;

  for (let i = 0; i < maxToWatch; i++) {
    yield take('*');
  }

  console.log(`${maxToWatch} actions processed`);
  //yield put({type: 'SHOW_CONGRATULATION'})
}

// login / logout flow pattern example
// The loginFlow Saga more clearly conveys the expected action sequence.
// It knows that the LOGIN action should always be followed by a LOGOUT action and that LOGOUT is always followed by a LOGIN
// (a good UI should always enforce a consistent order of the actions, by hiding or disabling unexpected action).
// see: https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html
// or loginFlow.js
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}