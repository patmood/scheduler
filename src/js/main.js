import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducers from './reducers'
// import * as actions from './actions'

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
  journalEntries.forEach((entry) => {
    entry.facts = JSON.parse(entry.facts)
    console.log(entry)
    if (entry.name === 'CREATE_USER') {
      store.dispatch({ type: entry.name, name: entry.facts[0][3], id: entry.facts[0][1] })
    }
  })
}
