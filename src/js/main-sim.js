// Simulation
// Does not make requests, uses sim data from server

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './components/AppContainer'

const run = () => {
  ReactDOM.render(
    <AppContainer {...window.__preload_AppContainer} />,
    document.getElementById('app')
  )
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run)
} else {
  window.attachEvent('onload', run)
}
