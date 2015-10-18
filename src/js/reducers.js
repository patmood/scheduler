// To combine multiple reducers, use import { combineReducers } from 'redux';
import { ADD_USER, DELETE_USER, SELECT_USER } from './actions'
const initialState = {
  users: [],
  days: [],
  activeUser: null,
}
// window.__preload_AppContainer

export default (state = initialState, action) => {
  console.log('state', state)
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, { users: state.users.concat([ {name: action.name} ]) })

    case DELETE_USER:
      return [{
        user: 'delete user',
      }, ...state]

    case SELECT_USER:
      return Object.assign({}, state, { activeUser: action.id })

    default:
      return state
  }
}
