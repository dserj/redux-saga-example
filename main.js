import "babel-polyfill"
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import React from 'react'
import ReactDOM from 'react-dom'

// First we import our Saga from the ./sagas module
import rootSaga from './sagas'

// Then we create a middleware using the factory function
const sagaMiddleware = createSagaMiddleware();

import Counter from './Counter'
import reducer from './reducers'

// Before running our helloSaga, we must connect our middleware to the Store using applyMiddleware
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Then we can use the sagaMiddleware.run(helloSaga) to start our Saga.
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type});

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}

      // my test sagas
      onFetch={() => action('FETCH_ASYNC')}
      onFetchLatest={() => action('FETCH_LATEST_ASYNC')}

      // Note that unlike in redux-thunk, our component dispatches a plain object action.
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
