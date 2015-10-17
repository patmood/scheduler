export const ADD_USER = 'ADD_USER'
export const DELETE_USER = 'DELETE_USER'

export const selectUser = (text) => {
  return {tyoe: 'ADD_USER', text: text}
}
