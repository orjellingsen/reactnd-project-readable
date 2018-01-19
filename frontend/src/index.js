import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import 'typeface-roboto'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const element = document.getElementById('root')
if (!element) {
  throw new Error('couldn\'t find element with id root')
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, element
)
registerServiceWorker()

