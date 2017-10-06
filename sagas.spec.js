import test from 'tape';
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

// incrementAsync is a generator function.
// When run, it returns an iterator object, and the iterator's next method returns an object with the following shape
// gen.next() // => { done: boolean, value: any }
// In the case of incrementAsync, the generator yields 2 values consecutively:
// yield delay(1000)
// yield put({type: 'INCREMENT'})
// So now, in order to test the logic inside incrementAsync,
// we'll simply have to iterate over the returned Generator and check the values yielded by the generator
import { incrementAsync } from './sagas'

// This separation between Effect creation and Effect execution makes it possible to test our Generator in a surprisingly easy way
test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
});