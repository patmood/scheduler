// To combine multiple reducers, use import { combineReducers } from 'redux';
import { ADD_USER, DELETE_USER } from './actions'
const initialState = {
  text: 'do the redux',
}
// window.__preload_AppContainer

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [{
        // text: action.text <<<< Someting like that
        user: 'new user',
      }, ...state]

    case DELETE_USER:
      return [{
        user: 'delete user',
      }, ...state]

    default:
      return state
  }
}
