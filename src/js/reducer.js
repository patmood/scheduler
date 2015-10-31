// To combine multiple reducers, use import { combineReducers } from 'redux';
import Immutable from 'immutable'
import moment from 'moment'

const generateMonth = () => {
  const days = {}
  for (let i = 0; i < 30; i++) {
    const day = moment().add(i, 'days').format('L')
    days[day] = { date: day }
  }
  return days
}


const initialState = Immutable.fromJS({
  users: {},
  days: generateMonth(),
  unavailability: {},
  activeUser: null,
})

export default (state = initialState, action) => {
  console.log(action)
  const handler = actionReducers[action.type]
  state = handler ? handler(state, action) : state
  window._state = state // Debug
  return state
}

const actionReducers = {
  CREATE_USER (state, action) {
    const [ _type, id, _attributeName, value ] = action.facts[0]
    state = state.set('activeUser', id)
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
    return state.setIn(['days', id], Immutable.Map({ date: id, userId: value }))
  },

  ASSIGN_HOLIDAY (state, action) {
    const [ _type, id, _attributeName, value ] = action.facts[0]
    return state.setIn(['days', id], { date: id, holidayName: value })
  },

  UNASSIGN_HOLIDAY (state, action) {
    const [ _type, id, _attributeName ] = action.facts[0]
    return state.setIn(['days', id], { date: id, holidayName: null })
  },

  ASSIGN_UNAVAILABILITY (state, action) {
    let [ _type, id, _attributeName, value ] = action.facts[0]
    state = state.setIn(['unavailability', id], Immutable.Map({ id, userId: value }))

    // Cant reassign with destructuring?
    // [ _type, id, _attributeName, value ] = action.facts[1]
    value = action.facts[1][3]
    return state.mergeIn(['unavailability', id], Immutable.Map({ day: value }))
  },

  UNASSIGN_UNAVAILABILITY (state, action) {
    const [ _type, id ] = action.facts[0]
    return state.deleteIn(['unavailability', id])
  },

  SWAP_ASSIGNMENT (state, action) {
    let [ _type, day1, _attributeName, user1 ] = action.facts[0]
    state = state.setIn(['days', day1], { date: day1, userId: user1 }) // set denton to monday
    const day2 = action.facts[1][1]
    const user2 = action.facts[1][3]
    state = state.setIn(['days', day2], { date: day2, userId: user2 }) // set denton to monday

    const unavailId = action.facts[2][1]
    const unavailUserId = action.facts[2][3]
    const unavailDate = action.facts[3][3]
    state = state.setIn(['unavailability', unavailId], Immutable.Map({ unavailId, userId: unavailUserId, date: unavailDate }))

    return state
  },

}
