// To combine multiple reducers, use import { combineReducers } from 'redux';
import { CREATE_USER, DELETE_USER, SELECT_USER } from './actions'
const initialState = {
  users: {},
  days: [],
  activeUser: null,
}

export default (state = initialState, action) => {
  // console.log('state', state)
  switch (action.type) {
    case CREATE_USER:
      const [ _type, id, _attributeName, value ] = action.facts[0]
      // TODO: use immutable to replace Object assign
      const newUsers = Object.assign({}, state.users, { [id]: { name: value, id } })
      return Object.assign({}, state, { users: newUsers })

    case DELETE_USER: deleteUser(state, action)

    case SELECT_USER:
      console.log('SELECT_USER', action.id)
      return Object.assign({}, state, { activeUser: action.id })

    default:
      return state
  }
}

const deleteUser = (state, action) => {
  const [ _type, id ] = action.facts[0]
  const newUsers = Object.assign({}, state.users)
  delete newUsers[id]
  return Object.assign({}, state, { users: newUsers })
}
