import Uid from 'sequential-guid'
const uid = new Uid()

export const CREATE_USER = 'CREATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const SELECT_USER = 'SELECT_USER'
export const ASSIGN_DAY = 'ASSIGN_DAY'
export const ASSIGN_HOLIDAY = 'ASSIGN_HOLIDAY'
export const UNASSIGN_HOLIDAY = 'UNASSIGN_HOLIDAY'
export const ASSIGN_UNAVAILABILITY = 'ASSIGN_UNAVAILABILITY'
export const UNASSIGN_UNAVAILABILITY = 'UNASSIGN_UNAVAILABILITY'
export const SWAP_ASSIGNMENT = 'SWAP_ASSIGNMENT'

export const addUser = (name) => {
  return { type: 'CREATE_USER', name: name, id: uid.next() }
}

export const deleteUser = (id) => {
  return { type: 'DELETE_USER', id: id }
}

export const selectUser = (id) => {
  return { type: 'SELECT_USER', id: id }
}
