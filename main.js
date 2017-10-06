import "babel-polyfill"
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import React from 'react'
import ReactDOM from 'react-dom'

// First we import our Saga from the ./sagas module
import { helloSaga } from './sagas'

// Then we create a middleware using the factory function
const sagaMiddleware = createSagaMiddleware()

import Counter from './Counter'
import reducer from './reducers'

// Before running our helloSaga, we must connect our middleware to the Store using applyMiddleware
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

// Then we can use the sagaMiddleware.run(helloSaga) to start our Saga.
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
