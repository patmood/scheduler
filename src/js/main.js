import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducer'

let store = createStore(reducer)
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

    if (entry.type === 'CREATE_USER' || entry.type === 'ASSIGN_DAY') {
      store.dispatch(entry)
    }
  })
}
