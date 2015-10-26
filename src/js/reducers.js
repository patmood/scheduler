// To combine multiple reducers, use import { combineReducers } from 'redux';
import { CREATE_USER, DELETE_USER, SELECT_USER } from './actions'
const initialState = {
  users: [],
  days: [],
  activeUser: null,
}

export default (state = initialState, action) => {
  // console.log('state', state)
  switch (action.type) {
    case CREATE_USER:
      const [ _type, id, path, name ] = action.facts[0]
      return Object.assign({}, state, { users: state.users.concat([{ name, id }]) })

    case DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter((u) => u.id !== action.id),
        days: state.days.filter((u) => u.user_id !== action.id),
      })

    case SELECT_USER:
      console.log('SELECT_USER', action.id)
      return Object.assign({}, state, { activeUser: action.id })

    default:
      return state
  }
}
