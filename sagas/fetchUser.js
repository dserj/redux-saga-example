import Api from '../api';
import { put, takeEvery, takeLatest, call } from 'redux-saga/effects'

export function* fetchUser() {
  try
  {
    //console.log('in fetch user');
    const data = yield call(Api.fetchUser);
    //console.log(data);
    yield put({ type: 'FETCH_SUCCESS', data: data });
  }
  catch (e)
  {
    yield put({ type: 'FETCH_FAILED', error: e });
  }
}

export function* watchFetchData() {
  yield takeEvery('FETCH_ASYNC', fetchUser)
}

// Unlike takeEvery, takeLatest allows only one fetchData task to run at any moment.
// And it will be the latest started task.
// If a previous task is still running when another fetchData task is started, the previous task will be automatically cancelled.
export function* watchFetchLatesData() {
  yield takeLatest('FETCH_LATEST_ASYNC', fetchUser)
}



