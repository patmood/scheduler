import React, { PropTypes, Component } from 'react'

export class AddUser extends Component {

  render () {
    const { addUser } = this.props
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Add User:</h2>
        <input type='text' placeholder='Name' ref='username' />
        <button type='submit'>Add</button>
      </form>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    const name = this.refs.username.value
    this.props.addUser(name)
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func,
}

export default AddUser
