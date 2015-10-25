import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducers from './reducers'

let store = createStore(reducers)
const rootElement = document.getElementById('app')

// console.log(store)

const run = () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>)
  , rootElement
  )
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run)
} else {
  window.attachEvent('onload', run)
}

window.hydrateStore = (journalEntries) => {
  journalEntries.forEach((entry) => console.log(entry))
}
