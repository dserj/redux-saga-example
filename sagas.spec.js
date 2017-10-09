import test from 'tape';
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import Api from './api';

// incrementAsync is a generator function.
// When run, it returns an iterator object, and the iterator's next method returns an object with the following shape
// gen.next() // => { done: boolean, value: any }
// In the case of incrementAsync, the generator yields 2 values consecutively:
// yield delay(1000)
// yield put({type: 'INCREMENT'})
// So now, in order to test the logic inside incrementAsync,
// we'll simply have to iterate over the returned Generator and check the values yielded by the generator
import { incrementAsync } from './sagas/incrementAsync';
import { fetchUser } from './sagas/fetchUser'

// This separation between Effect creation and Effect execution makes it possible to test our Generator in a surprisingly easy way
test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  );

  assert.end()
});

test('fetchUser Saga test', (assert) => {
  const gen = fetchUser();

  assert.deepEqual(
    gen.next().value,
    call(Api.fetchUser),
    'fetchUser Saga must call Api.fetchUser'
  );

  // we can manipulate generator's value and mocking results
  const mockResult = {};

  assert.deepEqual(
    gen.next(mockResult).value,
    put({ type: 'FETCH_SUCCESS', data: mockResult }),
    'fetchUser Saga must put FETCH_SUCCESS after fetch'
  );

  assert.end();
});

test('fetchUser Saga error handling test', (assert) => {
  const gen = fetchUser();

  assert.deepEqual(
    gen.next().value,
    call(Api.fetchUser),
    'fetchUser Saga must call Api.fetchUser'
  );

  // we can manipulate generator's value and mocking results
  const error = {};

  assert.deepEqual(
    gen.throw(error).value,
    put({ type: 'FETCH_FAILED', error: error }),
    'fetchUser Saga must put FETCH_FAILED after fetch'
  );

  assert.end();
});