import Uid from 'sequential-guid'
const uid = new Uid()

export const addUser = (name) => {
  return { type: 'CREATE_USER', facts: [
    ['assert', uid.next(), 'user/name', name],
  ]}
}

export const deleteUser = (id) => {
  return { type: 'DELETE_USER', facts: [
    ['retract', id],
  ] }
}

export const selectUser = (id) => {
  return { type: 'SELECT_USER', facts: [
    ['assert', id],
  ]}
}

export const assignDay = (date, userId) => {
  return { type: 'ASSIGN_DAY', facts: [
    ['assert', date, 'day/user', userId],
  ]}
}

export const assignHoliday = (date, holidayName) => {
  return { type: 'ASSIGN_HOLIDAY', facts: [
    ['assert', date, 'day/holidayName', holidayName],
  ]}
}

export const unassignHoliday = (date) => {
  return { type: 'UNASSIGN_HOLIDAY', facts: [
    ['retract', date, 'day/holidayName'],
  ]}
}

export const assignUnavailability = (state, action) => {
  return { type: ASSIGN_UNAVAILABILITY, facts: [
    []
  ]}
}

export const unassignUnavailability = (state, action) => {
  return { type: UNASSIGN_UNAVAILABILITY, facts: [
    []
  ]}
}

export const swapAssignment = (state, action) => {
  return { type: SWAP_ASSIGNMENT, facts: [
    []
  ]}
}
