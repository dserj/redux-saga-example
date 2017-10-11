// detailed description: https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html

import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'

import Api from '../api';

// function* authorize(user, password) {
//   try {
//     const token = yield call(Api.authorize, user, password);
//     yield put({type: 'LOGIN_SUCCESS', token});
//     yield call(Api.storeItem, {token})
//   } catch(error) {
//     yield put({type: 'LOGIN_ERROR', error})
//   }
// }

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({type: 'LOGIN_SUCCESS', token});
    yield call(Api.storeItem, {token});
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error});
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
      // dispatch a dedicated action RESET_LOGIN_PENDING
      // more simply, make the reducer clear the isLoginPending on a LOGOUT action
    }
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST');
    // fork return a Task object
    const task = yield fork(authorize, user, password);
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    if (action.type === 'LOGOUT')
      yield cancel(task);
    yield call(Api.clearItem, 'token')
  }
}