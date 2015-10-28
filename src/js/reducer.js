// To combine multiple reducers, use import { combineReducers } from 'redux';
import Immutable from 'immutable'
import { CREATE_USER, DELETE_USER, SELECT_USER, ASSIGN_DAY } from './actions'
const initialState = Immutable.fromJS({
  users: {},
  days: {},
  activeUser: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER: return createUser(state, action)
    case DELETE_USER: return deleteUser(state, action)
    case SELECT_USER: return selectUser(state, action)
    case ASSIGN_DAY: return assignDay(state, action)

    default:
      return state
  }
}

const createUser = (state, action) => {
  const [ _type, id, _attributeName, value ] = action.facts[0]
  return state.setIn(['users', id], Immutable.Map({ name: value, id }))
  // Non immutable technique:
  // const newUsers = Object.assign({}, state.users, { [id]: { name: value, id } })
  // return Object.assign({}, state, { users: newUsers })
}

const deleteUser = (state, action) => {
  const [ _type, id ] = action.facts[0]
  return state.deleteIn(['users', id])
  // Non immutable technique:
  // const newUsers = Object.assign({}, state.users)
  // delete newUsers[id]
  // return Object.assign({}, state, { users: newUsers })
}

const selectUser = (state, action) => {
  const [ _type, id ] = action.facts[0]
  return state.set('activeUser', id)
}

const assignDay = (state, action) => {
  const [ _type, id, _attributeName, value ] = action.facts[0]
  return state.setIn(['days', id], { date: id, userId: value })
}
