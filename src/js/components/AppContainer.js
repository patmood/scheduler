// import React, { PropTypes, Component } from 'react'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import App from './App'

import { selectUser } from '../actions'

const mapStateToProps = (state) => {
  return {
    users: state.users,
    days: state.days,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectUser: () => dispatch(selectUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
