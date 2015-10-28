// To combine multiple reducers, use import { combineReducers } from 'redux';
import { CREATE_USER, DELETE_USER, SELECT_USER } from './actions'
const initialState = {
  users: {},
  days: [],
  activeUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER: return createUser(state, action)
    case DELETE_USER: return deleteUser(state, action)
    case SELECT_USER: return selectUser(state, action)

    default:
      return state
  }
}

const createUser = (state, action) => {
  const [ _type, id, _attributeName, value ] = action.facts[0]
  // TODO: use immutable to replace Object assign
  const newUsers = Object.assign({}, state.users, { [id]: { name: value, id } })
  return Object.assign({}, state, { users: newUsers })
}

const deleteUser = (state, action) => {
  const [ _type, id ] = action.facts[0]
  const newUsers = Object.assign({}, state.users)
  delete newUsers[id]
  return Object.assign({}, state, { users: newUsers })
}

const selectUser = (state, action) => {
  const [ _type, id ] = action.facts[0]
  console.log('SELECT_USER', id)
  return Object.assign({}, state, { activeUser: id })
}
