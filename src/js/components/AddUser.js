import React, { PropTypes, Component } from 'react'

export class AddUser extends Component {

  render () {
    const { addUser } = this.props
    return (
      <div>
        <h2>Add User:</h2>
        <input type='text' placeholder='Name' ref='username' />
        <button onClick={this.handleSubmit.bind(this)}>Add</button>
      </div>
    )
  }

  handleSubmit () {
    const name = this.refs.username.value
    this.props.addUser(name)
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func,
}

export default AddUser
