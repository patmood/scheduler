import Uid from 'sequential-guid'
const uid = new Uid()

export const ADD_USER = 'ADD_USER'
export const DELETE_USER = 'DELETE_USER'
export const SELECT_USER = 'SELECT_USER'

export const addUser = (name) => {
  return { type: 'ADD_USER', name: name, id: uid.next() }
}

export const selectUser = (id) => {
  return { type: 'SELECT_USER', id: id }
}
