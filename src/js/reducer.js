// To combine multiple reducers, use import { combineReducers } from 'redux';
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  users: {},
  days: {},
  activeUser: null,
})

export default (state = initialState, action) => {
  const handler = actionReducers[action.type]
  return handler ? handler(state, action) : state
}

const actionReducers = {
  CREATE_USER (state, action) {
    const [ _type, id, _attributeName, value ] = action.facts[0]
    return state.setIn(['users', id], Immutable.Map({ name: value, id }))
    // Non immutable technique:
    // const newUsers = Object.assign({}, state.users, { [id]: { name: value, id } })
    // return Object.assign({}, state, { users: newUsers })
  },

  DELETE_USER (state, action) {
    const [ _type, id ] = action.facts[0]
    return state.deleteIn(['users', id])
    // Non immutable technique:
    // const newUsers = Object.assign({}, state.users)
    // delete newUsers[id]
    // return Object.assign({}, state, { users: newUsers })
  },

  SELECT_USER (state, action) {
    const [ _type, id ] = action.facts[0]
    return state.set('activeUser', id)
  },

  ASSIGN_DAY (state, action) {
    const [ _type, id, _attributeName, value ] = action.facts[0]
    return state.setIn(['days', id], { date: id, userId: value })
  },

  ASSIGN_HOLIDAY (state, action) {
    const [ _type, id, _attributeName, value ] = action.facts[0]
    return state.setIn(['days', id], { date: id, holidayName: value })
  },

  UNASSIGN_HOLIDAY (state, action) {
    const [ _type, id, _attributeName ] = action.facts[0]
    console.log(action)
    return state.setIn(['days', id], { date: id, holidayName: null })
  }
}
